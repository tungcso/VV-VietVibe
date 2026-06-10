"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const login_controller_js_1 = require("./login.controller.js");
const login_service_js_1 = require("./login.service.js");
const user_schema_js_1 = require("./schemas/user.schema.js");
const token_blacklist_schema_js_1 = require("./schemas/token-blacklist.schema.js");
const account_lockout_schema_js_1 = require("./schemas/account-lockout.schema.js");
const audit_log_schema_js_1 = require("./schemas/audit-log.schema.js");
const jwt_utils_service_js_1 = require("./services/jwt-utils.service.js");
const token_blacklist_service_js_1 = require("./services/token-blacklist.service.js");
const account_lockout_service_js_1 = require("./services/account-lockout.service.js");
const audit_log_service_js_1 = require("./services/audit-log.service.js");
const jwt_auth_guard_js_1 = require("./guards/jwt-auth.guard.js");
const token_cleanup_task_js_1 = require("./tasks/token-cleanup.task.js");
let LoginModule = class LoginModule {
};
exports.LoginModule = LoginModule;
exports.LoginModule = LoginModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_js_1.User.name, schema: user_schema_js_1.UserSchema },
                { name: token_blacklist_schema_js_1.TokenBlacklist.name, schema: token_blacklist_schema_js_1.TokenBlacklistSchema },
                { name: account_lockout_schema_js_1.AccountLockout.name, schema: account_lockout_schema_js_1.AccountLockoutSchema },
                { name: audit_log_schema_js_1.AuditLog.name, schema: audit_log_schema_js_1.AuditLogSchema },
            ]),
        ],
        controllers: [login_controller_js_1.LoginController],
        providers: [
            login_service_js_1.LoginService,
            jwt_utils_service_js_1.JwtUtilsService,
            token_blacklist_service_js_1.TokenBlacklistService,
            account_lockout_service_js_1.AccountLockoutService,
            audit_log_service_js_1.AuditLogService,
            jwt_auth_guard_js_1.JwtAuthGuard,
            token_cleanup_task_js_1.TokenCleanupTask,
        ],
        exports: [jwt_auth_guard_js_1.JwtAuthGuard, jwt_utils_service_js_1.JwtUtilsService, token_blacklist_service_js_1.TokenBlacklistService, account_lockout_service_js_1.AccountLockoutService, audit_log_service_js_1.AuditLogService],
    })
], LoginModule);
//# sourceMappingURL=login.module.js.map