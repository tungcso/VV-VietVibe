import { TokenBlacklistService } from '../services/token-blacklist.service.js';
import { AuditLogService } from '../services/audit-log.service.js';
export declare class TokenCleanupTask {
    private readonly tokenBlacklistService;
    private readonly auditLogService;
    constructor(tokenBlacklistService: TokenBlacklistService, auditLogService: AuditLogService);
    cleanExpiredTokensAndLogs(): Promise<void>;
}
