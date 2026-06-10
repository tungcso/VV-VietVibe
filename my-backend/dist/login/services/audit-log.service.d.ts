import { Model } from 'mongoose';
import { AuditLogDocument } from '../schemas/audit-log.schema.js';
export declare class AuditLogService {
    private auditLogModel;
    constructor(auditLogModel: Model<AuditLogDocument>);
    logAuthEvent(email: string, action: string, status: string, options?: {
        user_id?: string;
        ip_address?: string;
        user_agent?: string;
        error_message?: string;
        metadata?: Record<string, any>;
        duration_ms?: number;
    }): Promise<AuditLogDocument>;
    getUserAuditHistory(email: string, limit?: number): Promise<AuditLogDocument[]>;
    getFailedLoginAttempts(email: string, hours?: number): Promise<number>;
    getSuspiciousActivities(hours?: number): Promise<AuditLogDocument[]>;
    cleanOldLogs(): Promise<number>;
}
