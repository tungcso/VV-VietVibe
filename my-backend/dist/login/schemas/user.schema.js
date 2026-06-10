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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let User = class User {
    role;
    email;
    password_hash;
    user_name;
    full_name;
    avatar_url;
    listening_settings;
    badges;
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['learner', 'admin'], default: 'learner' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password_hash", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], User.prototype, "user_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], User.prototype, "full_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], User.prototype, "avatar_url", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            playback_speed: { type: Number, default: 1.0 },
            auto_pause: { type: Boolean, default: false },
            environment_sound_id: { type: mongoose_2.Types.ObjectId, ref: 'EnvironmentSound', default: null },
            environment_volume: { type: Number, default: 50 }
        },
        default: {
            playback_speed: 1.0,
            auto_pause: false,
            environment_sound_id: null,
            environment_volume: 50
        }
    }),
    __metadata("design:type", Object)
], User.prototype, "listening_settings", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: String, enum: ['LISTENING', 'SPEAKING', 'READING'] }], default: [] }),
    __metadata("design:type", Array)
], User.prototype, "badges", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map