import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator to get current user from JWT token
 * Usage: @CurrentUser() user: JwtPayload
 */
export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

/**
 * Decorator to get current token from request
 * Usage: @CurrentToken() token: string
 */
export const CurrentToken = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.token;
});
