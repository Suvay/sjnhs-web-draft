import mongoose, { Schema, Document, Types } from 'mongoose';
import { ContentPage } from '../../shared/types';

/**
 * Interface for ContentPage document
 */
export interface IContentPageDocument extends Omit<ContentPage, '_id'>, Document {}

/**
 * ContentPage schema definition
 * Manages website page content with flexible JSON structure
 */
const ContentPageSchema = new Schema<IContentPageDocument>({
  pageKey: {
    type: String,
    required: [true, 'Page key is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-_]+$/, 'Page key can only contain lowercase letters, numbers, hyphens, and underscores'],
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title must be less than 200 characters'],
  },
  content: {
    type: Schema.Types.Mixed,
    default: {},
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  modifiedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Modified by user is required'],
  },
}, {
  timestamps: true,
  collection: 'content_pages',
});

/**
 * Indexes for better query performance
 */
ContentPageSchema.index({ pageKey: 1 });
ContentPageSchema.index({ isPublished: 1 });
ContentPageSchema.index({ modifiedBy: 1 });
ContentPageSchema.index({ updatedAt: -1 });

/**
 * Transform output to format _id and populate user info
 */
ContentPageSchema.set('toJSON', {
  transform: function(doc, ret: any) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

/**
 * ContentPage model export
 */
export const ContentPageModel = mongoose.model<IContentPageDocument>('ContentPage', ContentPageSchema);