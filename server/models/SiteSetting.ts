import mongoose, { Schema, Document } from 'mongoose';
import { SiteSetting } from '../../shared/types';

/**
 * Interface for SiteSetting document
 */
export interface ISiteSettingDocument extends Omit<SiteSetting, '_id'>, Document {}

/**
 * SiteSetting schema definition
 * Manages global site configuration and settings
 */
const SiteSettingSchema = new Schema<ISiteSettingDocument>({
  key: {
    type: String,
    required: [true, 'Key is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-_.]+$/, 'Key can only contain lowercase letters, numbers, hyphens, dots, and underscores'],
  },
  value: {
    type: String,
    required: [true, 'Value is required'],
    maxlength: [1000, 'Value must be less than 1000 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description must be less than 500 characters'],
  },
  category: {
    type: String,
    enum: ['contact', 'social', 'enrollment', 'general'],
    default: 'general',
  },
}, {
  timestamps: true,
  collection: 'site_settings',
});

/**
 * Indexes for better query performance
 */
SiteSettingSchema.index({ key: 1 });
SiteSettingSchema.index({ category: 1 });

/**
 * Static method to get setting by key
 */
SiteSettingSchema.statics.getByKey = async function(key: string): Promise<string | null> {
  const setting = await this.findOne({ key });
  return setting ? setting.value : null;
};

/**
 * Static method to set setting value
 */
SiteSettingSchema.statics.setByKey = async function(key: string, value: string, description?: string, category?: string): Promise<ISiteSettingDocument> {
  return await this.findOneAndUpdate(
    { key },
    { value, description, category },
    { upsert: true, new: true, runValidators: true }
  );
};

/**
 * Static method to get all settings by category
 */
SiteSettingSchema.statics.getByCategory = async function(category: string): Promise<ISiteSettingDocument[]> {
  return await this.find({ category }).sort({ key: 1 });
};

/**
 * Transform output to format _id
 */
SiteSettingSchema.set('toJSON', {
  transform: function(doc, ret: any) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

/**
 * SiteSetting model export
 */
export const SiteSettingModel = mongoose.model<ISiteSettingDocument>('SiteSetting', SiteSettingSchema);