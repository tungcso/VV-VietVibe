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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenBlacklistService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const token_blacklist_schema_js_1 = require("../schemas/token-blacklist.schema.js");
let TokenBlacklistService = class TokenBlacklistService {
    tokenBlacklistModel;
    constructor(tokenBlacklistModel) {
        this.tokenBlacklistModel = tokenBlacklistModel;
    }
    async revokeToken(token, userId, email, expiresAt, reason = 'manual') {
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
    async isTokenBlacklisted(token) {
        const result = await this.tokenBlacklistModel.findOne({ token }).exec();
        return !!result;
    }
    async getBlacklistedToken(token) {
        return this.tokenBlacklistModel.findOne({ token }).exec();
    }
    async revokeAllUserTokens(userId, reason = 'manual') {
        const result = await this.tokenBlacklistModel.updateMany({ user_id: userId }, { reason });
        return result.modifiedCount;
    }
    async cleanExpiredTokens() {
        const result = await this.tokenBlacklistModel.deleteMany({
            expires_at: { $lt: new Date() },
        });
        return result.deletedCount;
    }
    async getUserRevokedTokenCount(userId) {
        return this.tokenBlacklistModel.countDocuments({ user_id: userId });
    }
};
exports.TokenBlacklistService = TokenBlacklistService;
exports.TokenBlacklistService = TokenBlacklistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(token_blacklist_schema_js_1.TokenBlacklist.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TokenBlacklistService);
//# sourceMappingURL=token-blacklist.service.js.map