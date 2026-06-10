"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const user_schema_js_1 = require("../login/schemas/user.schema.js");
const login_module_js_1 = require("../login/login.module.js");
const roles_guard_js_1 = require("../login/guards/roles.guard.js");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_js_1.User.name, schema: user_schema_js_1.UserSchema }]),
            login_module_js_1.LoginModule,
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, roles_guard_js_1.RolesGuard],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map