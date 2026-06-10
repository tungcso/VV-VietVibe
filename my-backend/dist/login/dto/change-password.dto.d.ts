export declare class ChangePasswordDto {
    current_password: string;
    new_password: string;
    confirm_password: string;
    reason?: string;
}
export declare class ChangePasswordResponseDto {
    success: boolean;
    message: string;
    data?: {
        changed_at: string;
        user_id: string;
        email: string;
        all_tokens_revoked: boolean;
    };
}
