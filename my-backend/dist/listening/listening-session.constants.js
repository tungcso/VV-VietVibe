"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_AMBIENT_VOLUME = exports.DEFAULT_AMBIENT_SOUND = exports.DEFAULT_PLAYBACK_MODE = exports.DEFAULT_PLAYBACK_SPEED = exports.AMBIENT_SOUNDS = exports.PLAYBACK_MODES = exports.PLAYBACK_SPEEDS = void 0;
exports.normalizePlaybackSpeed = normalizePlaybackSpeed;
exports.normalizePlaybackMode = normalizePlaybackMode;
exports.normalizeAmbientSound = normalizeAmbientSound;
exports.normalizeAmbientVolume = normalizeAmbientVolume;
exports.PLAYBACK_SPEEDS = [0.75, 1];
exports.PLAYBACK_MODES = ['study', 'continuous'];
exports.AMBIENT_SOUNDS = ['cafe', 'road', 'market', 'office'];
exports.DEFAULT_PLAYBACK_SPEED = 1;
exports.DEFAULT_PLAYBACK_MODE = 'study';
exports.DEFAULT_AMBIENT_SOUND = null;
exports.DEFAULT_AMBIENT_VOLUME = 40;
function normalizePlaybackSpeed(value) {
    if (value === undefined || value === null || value === '') {
        return undefined;
    }
    const normalized = typeof value === 'string'
        ? Number(value.toLowerCase().replace('x', '').trim())
        : Number(value);
    return normalized;
}
function normalizePlaybackMode(value) {
    if (value === undefined || value === null || value === '') {
        return undefined;
    }
    const normalized = String(value).trim().toLowerCase();
    if (normalized === 'study' ||
        normalized === 'auto_stop' ||
        normalized === 'auto-stop' ||
        normalized === 'autostop') {
        return 'study';
    }
    return normalized;
}
function normalizeAmbientSound(value) {
    if (value === undefined || value === '') {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    const normalized = String(value).trim().toLowerCase();
    if (normalized === 'off' || normalized === 'none') {
        return null;
    }
    if (normalized === 'street') {
        return 'road';
    }
    return normalized;
}
function normalizeAmbientVolume(value) {
    if (value === undefined || value === null || value === '') {
        return undefined;
    }
    return Number(value);
}
//# sourceMappingURL=listening-session.constants.js.map