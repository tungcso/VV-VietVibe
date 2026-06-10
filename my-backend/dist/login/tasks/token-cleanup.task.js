"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenCleanupTask = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const token_blacklist_service_js_1 = require("../services/token-blacklist.service.js");
const audit_log_service_js_1 = require("../services/audit-log.service.js");
let TokenCleanupTask = class TokenCleanupTask {
    tokenBlacklistService;
    auditLogService;
    constructor(tokenBlacklistService, auditLogService) {
        this.tokenBlacklistService = tokenBlacklistService;
        this.auditLogService = auditLogService;
    }
    async cleanExpiredTokensAndLogs() {
        try {
            const deletedTokens = await this.tokenBlacklistService.cleanExpiredTokens();
            console.log(`[TokenCleanupTask] Removed ${deletedTokens} expired tokens from blacklist`);
            const deletedLogs = await this.auditLogService.cleanOldLogs();
            console.log(`[TokenCleanupTask] Removed ${deletedLogs} old audit logs (older than 90 days)`);
        }
        catch (error) {
            console.error('[TokenCleanupTask] Error during cleanup:', error);
        }
    }
};
exports.TokenCleanupTask = TokenCleanupTask;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_2AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TokenCleanupTask.prototype, "cleanExpiredTokensAndLogs", null);
exports.TokenCleanupTask = TokenCleanupTask = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_blacklist_service_js_1.TokenBlacklistService,
        audit_log_service_js_1.AuditLogService])
], TokenCleanupTask);
//# sourceMappingURL=token-cleanup.task.js.map