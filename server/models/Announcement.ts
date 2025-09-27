import mongoose, { Schema, Document, Types } from 'mongoose';
import { Announcement } from '../../shared/types';

/**
 * Interface for Announcement document
 */
export interface IAnnouncementDocument extends Omit<Announcement, '_id'>, Document {}

/**
 * Announcement schema definition
 * Manages school announcements and news
 */
const AnnouncementSchema = new Schema<IAnnouncementDocument>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title must be less than 200 characters'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
  },
  summary: {
    type: String,
    trim: true,
    maxlength: [500, 'Summary must be less than 500 characters'],
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  publishDate: {
    type: Date,
  },
  expiryDate: {
    type: Date,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Created by user is required'],
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
  }],
}, {
  timestamps: true,
  collection: 'announcements',
});

/**
 * Indexes for better query performance
 */
AnnouncementSchema.index({ isPublished: 1 });
AnnouncementSchema.index({ publishDate: -1 });
AnnouncementSchema.index({ expiryDate: 1 });
AnnouncementSchema.index({ createdBy: 1 });
AnnouncementSchema.index({ tags: 1 });
AnnouncementSchema.index({ title: 'text', content: 'text' }); // Text search

/**
 * Virtual for checking if announcement is currently active
 */
AnnouncementSchema.virtual('isActive').get(function(this: IAnnouncementDocument) {
  const now = new Date();
  if (!this.isPublished) return false;
  if (this.publishDate && this.publishDate > now) return false;
  if (this.expiryDate && this.expiryDate < now) return false;
  return true;
});

/**
 * Transform output to format _id
 */
AnnouncementSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret: any) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

/**
 * Announcement model export
 */
export const AnnouncementModel = mongoose.model<IAnnouncementDocument>('Announcement', AnnouncementSchema);