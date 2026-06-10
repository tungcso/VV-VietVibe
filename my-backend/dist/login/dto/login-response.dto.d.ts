export declare class UserResponseDto {
    id: string;
    email: string;
    user_name: string;
    role: string;
}
export declare class LoginResponseDto {
    access_token: string;
    user: UserResponseDto;
}
