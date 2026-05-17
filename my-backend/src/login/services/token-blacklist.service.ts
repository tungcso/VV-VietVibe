import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenBlacklist, TokenBlacklistDocument } from '../schemas/token-blacklist.schema.js';

@Injectable()
export class TokenBlacklistService {
  constructor(
    @InjectModel(TokenBlacklist.name)
    private readonly tokenBlacklistModel: Model<TokenBlacklistDocument>,
  ) {}

  /**
   * Thêm token vào blacklist
   */
  async revokeToken(
    token: string,
    userId: string,
    email: string,
    expiresAt: Date,
    reason: string = 'manual',
  ): Promise<TokenBlacklistDocument> {
    const blacklistedToken = await this.tokenBlacklistModel.create({
      token,
      user_id: userId,
      email,
      revoked_at: new Date(),
      expires_at: expiresAt,
      reason,
    });
    return blacklistedToken;
  }

  /**
   * Kiểm tra token có bị revoke không
   */
  async isTokenBlacklisted(token: string): Promise<boolean> {
    const result = await this.tokenBlacklistModel.findOne({ token }).exec();
    return !!result;
  }

  /**
   * Lấy thông tin token bị revoke
   */
  async getBlacklistedToken(token: string): Promise<TokenBlacklistDocument | null> {
    return this.tokenBlacklistModel.findOne({ token }).exec();
  }

  /**
   * Revoke tất cả tokens của một user
   */
  async revokeAllUserTokens(userId: string, reason: string = 'manual'): Promise<number> {
    const result = await this.tokenBlacklistModel.updateMany(
      { user_id: userId },
      { reason },
    );
    return result.modifiedCount;
  }

  /**
   * Xóa các blacklist entries hết hạn (dùng cho cleaning job)
   */
  async cleanExpiredTokens(): Promise<number> {
    const result = await this.tokenBlacklistModel.deleteMany({
      expires_at: { $lt: new Date() },
    });
    return result.deletedCount;
  }

  /**
   * Lấy số lượng tokens bị revoke của user
   */
  async getUserRevokedTokenCount(userId: string): Promise<number> {
    return this.tokenBlacklistModel.countDocuments({ user_id: userId });
  }
}
