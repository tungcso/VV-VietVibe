import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { JwtUtilsService } from './services/jwt-utils.service';
import { TokenBlacklistService } from './services/token-blacklist.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { TokenBlacklist } from './schemas/token-blacklist.schema';

describe('Login Service - Token Revocation', () => {
  let service: LoginService;
  let jwtUtilsService: JwtUtilsService;
  let tokenBlacklistService: TokenBlacklistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        JwtUtilsService,
        TokenBlacklistService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken(TokenBlacklist.name),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            updateMany: jest.fn(),
            deleteMany: jest.fn(),
            countDocuments: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
    jwtUtilsService = module.get<JwtUtilsService>(JwtUtilsService);
    tokenBlacklistService = module.get<TokenBlacklistService>(TokenBlacklistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('refreshToken', () => {
    it('should generate new tokens and revoke old refresh token', async () => {
      const refreshToken = jwtUtilsService.generateRefreshToken(
        '645abc123',
        'user@test.com',
        'learner',
      );

      const refreshTokenDto = { refresh_token: refreshToken };
      jest.spyOn(tokenBlacklistService, 'isTokenBlacklisted').mockResolvedValue(false);

      const result = await service.refreshToken(refreshTokenDto);

      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refresh_token');
      expect(result).toHaveProperty('expires_in');
      expect(result.refresh_token).not.toEqual(refreshToken);
    });
  });

  describe('revokeToken', () => {
    it('should add token to blacklist', async () => {
      const token = jwtUtilsService.generateAccessToken(
        '645abc123',
        'user@test.com',
        'learner',
      );

      jest.spyOn(tokenBlacklistService, 'revokeToken').mockResolvedValue({
        token,
        user_id: '645abc123',
        email: 'user@test.com',
        revoked_at: new Date(),
        expires_at: new Date(),
        reason: 'logout',
      } as any);

      const result = await service.revokeToken(token);

      expect(result.success).toEqual(true);
      expect(result.message).toContain('revoked');
    });
  });
});
