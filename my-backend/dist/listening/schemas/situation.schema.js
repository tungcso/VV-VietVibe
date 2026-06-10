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
exports.SituationSchema = exports.Situation = exports.ScriptItemSchema = exports.ScriptItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let ScriptItem = class ScriptItem {
    speaker_name;
    content_jp;
    content_vn;
    start_time;
    end_time;
    order_index;
};
exports.ScriptItem = ScriptItem;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ScriptItem.prototype, "speaker_name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ScriptItem.prototype, "content_jp", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ScriptItem.prototype, "content_vn", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ScriptItem.prototype, "start_time", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ScriptItem.prototype, "end_time", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ScriptItem.prototype, "order_index", void 0);
exports.ScriptItem = ScriptItem = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ScriptItem);
exports.ScriptItemSchema = mongoose_1.SchemaFactory.createForClass(ScriptItem);
let Situation = class Situation {
    title_vn;
    title_jp;
    main_audio_url;
    duration;
    scripts;
};
exports.Situation = Situation;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Situation.prototype, "title_vn", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Situation.prototype, "title_jp", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Situation.prototype, "main_audio_url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Situation.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.ScriptItemSchema], default: [] }),
    __metadata("design:type", Array)
], Situation.prototype, "scripts", void 0);
exports.Situation = Situation = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Situation);
exports.SituationSchema = mongoose_1.SchemaFactory.createForClass(Situation);
//# sourceMappingURL=situation.schema.js.map