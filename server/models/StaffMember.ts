import mongoose, { Schema, Document } from 'mongoose';
import { StaffMember } from '../../shared/types';

/**
 * Interface for StaffMember document
 */
export interface IStaffMemberDocument extends Omit<StaffMember, '_id'>, Document {}

/**
 * StaffMember schema definition
 * Manages faculty and staff directory
 */
const StaffMemberSchema = new Schema<IStaffMemberDocument>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name must be less than 100 characters'],
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true,
    maxlength: [100, 'Position must be less than 100 characters'],
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
    maxlength: [100, 'Department must be less than 100 characters'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone must be less than 20 characters'],
  },
  imageUrl: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL'],
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [1000, 'Bio must be less than 1000 characters'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
    min: [0, 'Order must be a positive number'],
  },
}, {
  timestamps: true,
  collection: 'staff_members',
});

/**
 * Indexes for better query performance
 */
StaffMemberSchema.index({ department: 1 });
StaffMemberSchema.index({ position: 1 });
StaffMemberSchema.index({ isActive: 1 });
StaffMemberSchema.index({ order: 1 });
StaffMemberSchema.index({ name: 'text' }); // Text search

/**
 * Transform output to format _id
 */
StaffMemberSchema.set('toJSON', {
  transform: function(doc, ret: any) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

/**
 * StaffMember model export
 */
export const StaffMemberModel = mongoose.model<IStaffMemberDocument>('StaffMember', StaffMemberSchema);