import { Model } from 'mongoose';
import { AccountLockoutDocument } from '../schemas/account-lockout.schema.js';
export declare class AccountLockoutService {
    private accountLockoutModel;
    constructor(accountLockoutModel: Model<AccountLockoutDocument>);
    getOrCreateLockoutRecord(email: string, userId?: string): Promise<AccountLockoutDocument>;
    recordFailedAttempt(email: string, ip: string, userAgent: string): Promise<AccountLockoutDocument>;
    recordSuccessfulLogin(email: string): Promise<void>;
    isAccountLocked(email: string): Promise<boolean>;
    getLockoutInfo(email: string): Promise<{
        is_locked: boolean;
        failed_attempts: number;
        locked_until?: Date | null;
        unlock_in_minutes?: number;
    }>;
    unlockAccount(email: string, reason: string): Promise<void>;
    lockAccount(email: string, reason: string, durationMinutes?: number): Promise<void>;
}
