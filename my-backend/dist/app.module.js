"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schedule_1 = require("@nestjs/schedule");
const app_controller_js_1 = require("./app.controller.js");
const app_service_js_1 = require("./app.service.js");
const product_schema_js_1 = require("./schemas/product.schema.js");
const users_module_js_1 = require("./users/users.module.js");
const vocabulary_module_js_1 = require("./vocabulary/vocabulary.module.js");
const login_module_js_1 = require("./login/login.module.js");
const listening_module_js_1 = require("./listening/listening.module.js");
const env_js_1 = require("./config/env.js");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(env_js_1.MONGO_URI),
            mongoose_1.MongooseModule.forFeature([{ name: product_schema_js_1.Product.name, schema: product_schema_js_1.ProductSchema }]),
            users_module_js_1.UsersModule,
            vocabulary_module_js_1.VocabularyModule,
            login_module_js_1.LoginModule,
            listening_module_js_1.ListeningModule,
        ],
        controllers: [app_controller_js_1.AppController],
        providers: [app_service_js_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map