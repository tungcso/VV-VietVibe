export declare class RevokeTokenResponseDto {
    success: boolean;
    message: string;
    revoked_at: Date;
}
export declare class RevokeAllTokensResponseDto {
    success: boolean;
    message: string;
    tokens_revoked: number;
    revoked_at: Date;
}
export declare class LogoutResponseDto {
    success: boolean;
    message: string;
}
