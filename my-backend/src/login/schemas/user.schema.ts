import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class User {
  @Prop({ type: String, enum: ['learner', 'admin'], default: 'learner' })
  role!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true })
  password_hash!: string;

  @Prop({ required: true, trim: true })
  user_name!: string;

  @Prop({ type: String, default: null })
  full_name!: string | null;

  @Prop({ type: String, default: null })
  avatar_url!: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
