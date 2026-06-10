"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListeningModule = void 0;
const common_1 = require("@nestjs/common");
const listening_controller_1 = require("./listening.controller");
const listening_service_1 = require("./listening.service");
const login_module_js_1 = require("../login/login.module.js");
const mongoose_1 = require("@nestjs/mongoose");
const situation_controller_1 = require("./situation.controller");
const situation_service_1 = require("./situation.service");
const environment_sound_controller_1 = require("./environment-sound.controller");
const situation_schema_1 = require("./schemas/situation.schema");
const environment_sound_schema_1 = require("./schemas/environment-sound.schema");
const user_listening_progress_schema_1 = require("./schemas/user-listening-progress.schema");
let ListeningModule = class ListeningModule {
};
exports.ListeningModule = ListeningModule;
exports.ListeningModule = ListeningModule = __decorate([
    (0, common_1.Module)({
        imports: [
            login_module_js_1.LoginModule,
            mongoose_1.MongooseModule.forFeature([
                { name: situation_schema_1.Situation.name, schema: situation_schema_1.SituationSchema },
                { name: environment_sound_schema_1.EnvironmentSound.name, schema: environment_sound_schema_1.EnvironmentSoundSchema },
                { name: user_listening_progress_schema_1.UserListeningProgress.name, schema: user_listening_progress_schema_1.UserListeningProgressSchema },
            ]),
        ],
        controllers: [listening_controller_1.ListeningController, situation_controller_1.SituationController, environment_sound_controller_1.EnvironmentSoundController],
        providers: [listening_service_1.ListeningService, situation_service_1.SituationService],
    })
], ListeningModule);
//# sourceMappingURL=listening.module.js.map