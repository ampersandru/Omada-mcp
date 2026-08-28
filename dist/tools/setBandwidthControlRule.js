import { wrapMutationToolHandler } from '../server/common.js';
import { bandwidthControlRulePayloadSchema, extractGridRecords, findGridRecordById, setBandwidthControlRuleInputSchema, validateBandwidthControlPayloadReferences, } from './firewallTrafficShared.js';
export function registerSetBandwidthControlRuleTool(server, client) {
    server.registerTool('setBandwidthControlRule', {
        description: 'Create or update a bandwidth control rule with dry-run preview support using the official Omada Open API BandwidthControlRule schema.',
        inputSchema: setBandwidthControlRuleInputSchema.shape,
        annotations: {
            destructiveHint: true,
        },
    }, wrapMutationToolHandler('setBandwidthControlRule', ({ ruleId, siteId }, result, mode) => ({
        action: ruleId ? 'update-bandwidth-control-rule' : 'create-bandwidth-control-rule',
        target: ruleId ?? siteId ?? 'default-site',
        siteId,
        mode,
        status: mode === 'dry-run' ? 'planned' : 'applied',
        summary: mode === 'dry-run' ? 'Planned bandwidth control rule mutation.' : 'Bandwidth control rule mutation requested.',
        result,
    }), async ({ ruleId, payload, dryRun, siteId, customHeaders }) => {
        const parsedPayload = bandwidthControlRulePayloadSchema.parse(payload);
        const existingRules = await client.getGridBandwidthCtrlRule(1, 1000, siteId, customHeaders);
        const before = ruleId ? findGridRecordById(existingRules, ruleId) : undefined;
        if (ruleId && !before) {
            throw new Error(`No bandwidth control rule exists for ${ruleId}.`);
        }
        await validateBandwidthControlPayloadReferences(client, parsedPayload, siteId, customHeaders);
        if (dryRun) {
            return {
                accepted: true,
                dryRun: true,
                before,
                plannedRule: parsedPayload,
            };
        }
        if (ruleId) {
            return await client.updateBandwidthCtrlRule(ruleId, parsedPayload, siteId, customHeaders);
        }
        const createResult = await client.createBandwidthCtrlRule(parsedPayload, siteId, customHeaders);
        const createdRuleId = (() => {
            if (!createResult || typeof createResult !== 'object') {
                return undefined;
            }
            const maybeId = createResult.id ??
                createResult.ruleId;
            return maybeId === undefined ? undefined : String(maybeId);
        })();
        if (createdRuleId) {
            return createResult;
        }
        const rulesAfterCreate = await client.getGridBandwidthCtrlRule(1, 1000, siteId, customHeaders);
        const beforeIds = new Set(extractGridRecords(existingRules).map((entry) => String(entry['id'] ?? entry['ruleId'] ?? '')));
        const createdRule = extractGridRecords(rulesAfterCreate).find((entry) => {
            const entryId = String(entry['id'] ?? entry['ruleId'] ?? '');
            return !beforeIds.has(entryId) && entry['name'] === parsedPayload.name;
        });
        if (createdRule) {
            const createdId = createdRule['id'] ?? createdRule['ruleId'];
            return {
                id: createdId === undefined ? undefined : String(createdId),
                createdRule,
            };
        }
        return createResult;
    }));
}
//# sourceMappingURL=setBandwidthControlRule.js.map