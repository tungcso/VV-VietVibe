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
exports.AccountLockoutSchema = exports.AccountLockout = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AccountLockout = class AccountLockout {
    user_id;
    email;
    failed_attempts;
    locked_until;
    status;
    last_failed_ip;
    last_failed_user_agent;
    last_failed_at;
    unlock_reason;
    unlocked_at;
};
exports.AccountLockout = AccountLockout;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: false, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AccountLockout.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true, unique: true }),
    __metadata("design:type", String)
], AccountLockout.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], AccountLockout.prototype, "failed_attempts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], AccountLockout.prototype, "locked_until", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['active', 'locked'], default: 'active' }),
    __metadata("design:type", String)
], AccountLockout.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], AccountLockout.prototype, "last_failed_ip", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], AccountLockout.prototype, "last_failed_user_agent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], AccountLockout.prototype, "last_failed_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], AccountLockout.prototype, "unlock_reason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], AccountLockout.prototype, "unlocked_at", void 0);
exports.AccountLockout = AccountLockout = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    })
], AccountLockout);
exports.AccountLockoutSchema = mongoose_1.SchemaFactory.createForClass(AccountLockout);
exports.AccountLockoutSchema.index({ locked_until: 1 }, { expireAfterSeconds: 0, sparse: true });
//# sourceMappingURL=account-lockout.schema.js.map