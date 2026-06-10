"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtUtilsService = void 0;
const common_1 = require("@nestjs/common");
const jwt = __importStar(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const env_js_1 = require("../../config/env.js");
let JwtUtilsService = class JwtUtilsService {
    generateAccessToken(userId, email, role) {
        return jwt.sign({
            sub: userId,
            email,
            role,
            type: 'access',
            jti: (0, crypto_1.randomUUID)(),
        }, env_js_1.JWT_SECRET, { expiresIn: '1d' });
    }
    generateRefreshToken(userId, email, role) {
        return jwt.sign({
            sub: userId,
            email,
            role,
            type: 'refresh',
            jti: (0, crypto_1.randomUUID)(),
        }, env_js_1.JWT_SECRET, { expiresIn: '30d' });
    }
    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, env_js_1.JWT_SECRET);
            return decoded;
        }
        catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new common_1.UnauthorizedException('Token が期限切れです');
            }
            throw new common_1.UnauthorizedException('無効な Token です');
        }
    }
    extractTokenFromBearer(authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.BadRequestException('Authorization header が無効です');
        }
        return authHeader.substring(7);
    }
    getTokenExpirationDate(token) {
        const decoded = jwt.decode(token);
        if (!decoded?.exp) {
            throw new common_1.BadRequestException('Token の有効期限を取得できません');
        }
        return new Date(decoded.exp * 1000);
    }
    getTokenExpirationInSeconds(token) {
        const decoded = jwt.decode(token);
        if (!decoded?.exp || !decoded?.iat) {
            throw new common_1.BadRequestException('Token の有効期限を計算できません');
        }
        return decoded.exp - decoded.iat;
    }
};
exports.JwtUtilsService = JwtUtilsService;
exports.JwtUtilsService = JwtUtilsService = __decorate([
    (0, common_1.Injectable)()
], JwtUtilsService);
//# sourceMappingURL=jwt-utils.service.js.map