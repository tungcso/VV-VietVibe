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
exports.UserListeningProgressSchema = exports.UserListeningProgress = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserListeningProgress = class UserListeningProgress {
    user_id;
    situation_id;
    highest_progress_seconds;
    is_completed;
};
exports.UserListeningProgress = UserListeningProgress;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], UserListeningProgress.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Situation', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], UserListeningProgress.prototype, "situation_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], UserListeningProgress.prototype, "highest_progress_seconds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], UserListeningProgress.prototype, "is_completed", void 0);
exports.UserListeningProgress = UserListeningProgress = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], UserListeningProgress);
exports.UserListeningProgressSchema = mongoose_1.SchemaFactory.createForClass(UserListeningProgress);
//# sourceMappingURL=user-listening-progress.schema.js.map