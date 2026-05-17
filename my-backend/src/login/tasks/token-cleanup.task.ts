import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TokenBlacklistService } from '../services/token-blacklist.service.js';

/**
 * Token Cleanup Task
 * Tự động xóa các blacklist entries hết hạn
 * Chạy mỗi ngày lúc 2:00 AM
 */
@Injectable()
export class TokenCleanupTask {
  constructor(private readonly tokenBlacklistService: TokenBlacklistService) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async cleanExpiredTokens() {
    const deletedCount = await this.tokenBlacklistService.cleanExpiredTokens();
    console.log(`[TokenCleanupTask] Removed ${deletedCount} expired tokens from blacklist`);
  }
}
