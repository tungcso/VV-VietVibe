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
exports.TokenBlacklistSchema = exports.TokenBlacklist = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let TokenBlacklist = class TokenBlacklist {
    token;
    user_id;
    email;
    revoked_at;
    expires_at;
    reason;
};
exports.TokenBlacklist = TokenBlacklist;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, index: true }),
    __metadata("design:type", String)
], TokenBlacklist.prototype, "token", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], TokenBlacklist.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TokenBlacklist.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], TokenBlacklist.prototype, "revoked_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], TokenBlacklist.prototype, "expires_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'manual' }),
    __metadata("design:type", String)
], TokenBlacklist.prototype, "reason", void 0);
exports.TokenBlacklist = TokenBlacklist = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    })
], TokenBlacklist);
exports.TokenBlacklistSchema = mongoose_1.SchemaFactory.createForClass(TokenBlacklist);
exports.TokenBlacklistSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });
//# sourceMappingURL=token-blacklist.schema.js.map