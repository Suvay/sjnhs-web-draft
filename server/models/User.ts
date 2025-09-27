import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '../../shared/types';

/**
 * Interface for User document with Mongoose-specific methods
 */
export interface IUserDocument extends Omit<User, '_id'>, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

/**
 * User schema definition
 * Includes validation, indexing, and middleware for password hashing
 */
const UserSchema = new Schema<IUserDocument>({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [50, 'Username must be less than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false, // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'viewer',
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
  collection: 'users',
});

/**
 * Indexes for better query performance
 */
UserSchema.index({ username: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1 });

/**
 * Pre-save middleware to hash password
 * Only hashes password if it's been modified
 */
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

/**
 * Method to compare password with hashed password
 */
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

/**
 * Transform output to remove sensitive fields and format _id
 */
UserSchema.set('toJSON', {
  transform: function(doc, ret: any) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  }
});

/**
 * User model export
 */
export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);