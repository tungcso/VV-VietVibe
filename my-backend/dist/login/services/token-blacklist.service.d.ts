import { Model } from 'mongoose';
import { TokenBlacklistDocument } from '../schemas/token-blacklist.schema.js';
export declare class TokenBlacklistService {
    private readonly tokenBlacklistModel;
    constructor(tokenBlacklistModel: Model<TokenBlacklistDocument>);
    revokeToken(token: string, userId: string, email: string, expiresAt: Date, reason?: string): Promise<TokenBlacklistDocument>;
    isTokenBlacklisted(token: string): Promise<boolean>;
    getBlacklistedToken(token: string): Promise<TokenBlacklistDocument | null>;
    revokeAllUserTokens(userId: string, reason?: string): Promise<number>;
    cleanExpiredTokens(): Promise<number>;
    getUserRevokedTokenCount(userId: string): Promise<number>;
}
