export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
    type: 'access' | 'refresh';
    jti?: string;
    iat?: number;
    exp?: number;
}
export declare class JwtUtilsService {
    generateAccessToken(userId: string, email: string, role: string): string;
    generateRefreshToken(userId: string, email: string, role: string): string;
    verifyToken(token: string): JwtPayload;
    extractTokenFromBearer(authHeader: string): string;
    getTokenExpirationDate(token: string): Date;
    getTokenExpirationInSeconds(token: string): number;
}
