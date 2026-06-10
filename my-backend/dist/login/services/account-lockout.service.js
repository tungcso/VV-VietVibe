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
exports.AccountLockoutService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const account_lockout_schema_js_1 = require("../schemas/account-lockout.schema.js");
let AccountLockoutService = class AccountLockoutService {
    accountLockoutModel;
    constructor(accountLockoutModel) {
        this.accountLockoutModel = accountLockoutModel;
    }
    async getOrCreateLockoutRecord(email, userId) {
        let record = await this.accountLockoutModel.findOne({ email }).exec();
        if (!record) {
            record = await this.accountLockoutModel.create({
                email,
                user_id: userId,
                failed_attempts: 0,
                status: 'active',
            });
        }
        return record;
    }
    async recordFailedAttempt(email, ip, userAgent) {
        const record = await this.getOrCreateLockoutRecord(email);
        const attempts = record.failed_attempts + 1;
        let lockedUntil = null;
        if (attempts >= 10) {
            lockedUntil = new Date(Date.now() + 60 * 60 * 1000);
        }
        else if (attempts >= 5) {
            lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
        }
        const updated = await this.accountLockoutModel.findOneAndUpdate({ email }, {
            failed_attempts: attempts,
            last_failed_at: new Date(),
            last_failed_ip: ip,
            last_failed_user_agent: userAgent,
            locked_until: lockedUntil,
            status: lockedUntil ? 'locked' : 'active',
        }, { new: true });
        return updated;
    }
    async recordSuccessfulLogin(email) {
        await this.accountLockoutModel.updateOne({ email }, {
            failed_attempts: 0,
            locked_until: null,
            status: 'active',
            last_failed_at: null,
        });
    }
    async isAccountLocked(email) {
        const record = await this.accountLockoutModel.findOne({ email }).exec();
        if (!record)
            return false;
        if (record.locked_until && record.locked_until > new Date()) {
            return true;
        }
        if (record.locked_until && record.locked_until <= new Date()) {
            await this.accountLockoutModel.updateOne({ email }, {
                locked_until: null,
                status: 'active',
            });
            return false;
        }
        return false;
    }
    async getLockoutInfo(email) {
        const record = await this.accountLockoutModel.findOne({ email }).exec();
        if (!record) {
            return {
                is_locked: false,
                failed_attempts: 0,
            };
        }
        const isLocked = record.locked_until && record.locked_until > new Date();
        if (isLocked) {
            const now = new Date();
            const diffMs = record.locked_until.getTime() - now.getTime();
            const diffMin = Math.ceil(diffMs / 60000);
            return {
                is_locked: true,
                failed_attempts: record.failed_attempts,
                locked_until: record.locked_until,
                unlock_in_minutes: diffMin,
            };
        }
        return {
            is_locked: false,
            failed_attempts: record.failed_attempts,
        };
    }
    async unlockAccount(email, reason) {
        await this.accountLockoutModel.updateOne({ email }, {
            failed_attempts: 0,
            locked_until: null,
            status: 'active',
            unlock_reason: reason,
            unlocked_at: new Date(),
        });
    }
    async lockAccount(email, reason, durationMinutes = 60) {
        const lockedUntil = new Date(Date.now() + durationMinutes * 60 * 1000);
        await this.accountLockoutModel.updateOne({ email }, {
            locked_until: lockedUntil,
            status: 'locked',
            unlock_reason: reason,
        }, { upsert: true });
    }
};
exports.AccountLockoutService = AccountLockoutService;
exports.AccountLockoutService = AccountLockoutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(account_lockout_schema_js_1.AccountLockout.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AccountLockoutService);
//# sourceMappingURL=account-lockout.service.js.map