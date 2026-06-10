import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { RefreshTokenDto, RefreshTokenResponseDto } from './dto/refresh-token.dto.js';
import { RevokeTokenDto } from './dto/revoke-token.dto.js';
import { ChangePasswordDto, ChangePasswordResponseDto } from './dto/change-password.dto.js';
import { LoginService } from './login.service.js';
import { LoginResponseDto } from './dto/login-response.dto.js';
import { RevokeTokenResponseDto, RevokeAllTokensResponseDto, LogoutResponseDto } from './dto/revoke-response.dto.js';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    login(loginDto: LoginDto, req: any): Promise<LoginResponseDto & {
        refresh_token: string;
    }>;
    register(registerDto: RegisterDto): Promise<LoginResponseDto & {
        refresh_token: string;
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenResponseDto>;
    revokeToken(req: any, revokeDto?: RevokeTokenDto): Promise<RevokeTokenResponseDto>;
    revokeAllTokens(req: any): Promise<RevokeAllTokensResponseDto>;
    logout(req: any): Promise<LogoutResponseDto>;
    changePassword(req: any, changePasswordDto: ChangePasswordDto): Promise<ChangePasswordResponseDto>;
    getAuditHistory(req: any): Promise<any>;
}
