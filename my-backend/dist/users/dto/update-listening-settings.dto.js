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
exports.UpdateListeningSettingsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateListeningSettingsDto {
    playback_speed;
    auto_pause;
    environment_sound_id;
    environment_volume;
}
exports.UpdateListeningSettingsDto = UpdateListeningSettingsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 0.75 }),
    __metadata("design:type", Number)
], UpdateListeningSettingsDto.prototype, "playback_speed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: true }),
    __metadata("design:type", Boolean)
], UpdateListeningSettingsDto.prototype, "auto_pause", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: '60d5f...' }),
    __metadata("design:type", String)
], UpdateListeningSettingsDto.prototype, "environment_sound_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 40 }),
    __metadata("design:type", Number)
], UpdateListeningSettingsDto.prototype, "environment_volume", void 0);
//# sourceMappingURL=update-listening-settings.dto.js.map