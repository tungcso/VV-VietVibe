import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenBlacklistDocument = TokenBlacklist & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class TokenBlacklist {
  @Prop({ required: true, unique: true, index: true })
  token!: string;

  @Prop({ required: true, type: String })
  user_id!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  revoked_at!: Date;

  @Prop({ required: true })
  expires_at!: Date;

  @Prop({ type: String, default: 'manual' })
  reason!: string; // 'logout', 'manual', 'password_changed', etc.
}

export const TokenBlacklistSchema = SchemaFactory.createForClass(TokenBlacklist);

// TTL Index - Tự động xóa documents sau khi hết hạn
TokenBlacklistSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });
