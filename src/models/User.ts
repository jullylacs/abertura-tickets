import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  email: string;
  name?: string;
  password: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['EMPLOYEE','TECHNICIAN'], default: 'EMPLOYEE' }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  // @ts-ignore
  if (!this.isModified || !this.isModified('password')) return next();
  // @ts-ignore
  const salt = await bcrypt.genSalt(10);
  // @ts-ignore
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidate: string) {
  // @ts-ignore
  return bcrypt.compare(candidate, this.password);
}

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
