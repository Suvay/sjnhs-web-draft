import mongoose, { Schema, Document, Types } from 'mongoose';

// Interface definitions for TypeScript
export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  password: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: Date;
  updatedAt: Date;
}

export interface IContentPage extends Document {
  _id: Types.ObjectId;
  pageKey: string;
  title: string;
  content: any;
  isPublished: boolean;
  lastModified: Date;
  modifiedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAnnouncement extends Document {
  _id: Types.ObjectId;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: Date;
  createdBy: Types.ObjectId;
  updatedAt: Date;
}

export interface IStaffMember extends Document {
  _id: Types.ObjectId;
  name: string;
  position: string;
  department?: string;
  email?: string;
  phone?: string;
  imageUrl?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEvent extends Document {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  eventDate: Date;
  location?: string;
  isPublished: boolean;
  createdAt: Date;
  createdBy: Types.ObjectId;
  updatedAt: Date;
}

export interface ISiteSetting extends Document {
  _id: Types.ObjectId;
  key: string;
  value?: string;
  description?: string;
  lastModified: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schemas
const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'editor',
    required: true
  }
}, {
  timestamps: true,
  collection: 'users'
});

const ContentPageSchema = new Schema<IContentPage>({
  pageKey: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: Schema.Types.Mixed,
    default: {}
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  modifiedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  collection: 'content_pages'
});

const AnnouncementSchema = new Schema<IAnnouncement>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  collection: 'announcements'
});

const StaffMemberSchema = new Schema<IStaffMember>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  collection: 'staff_members'
});

const EventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    trim: true
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  collection: 'events'
});

const SiteSettingSchema = new Schema<ISiteSetting>({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  value: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'site_settings'
});

// Add indexes for better performance
UserSchema.index({ username: 1 });
ContentPageSchema.index({ pageKey: 1 });
ContentPageSchema.index({ isPublished: 1 });
AnnouncementSchema.index({ isPublished: 1, createdAt: -1 });
StaffMemberSchema.index({ isActive: 1, order: 1 });
EventSchema.index({ isPublished: 1, eventDate: 1 });
SiteSettingSchema.index({ key: 1 });

// Create and export models
export const User = mongoose.model<IUser>('User', UserSchema);
export const ContentPage = mongoose.model<IContentPage>('ContentPage', ContentPageSchema);
export const Announcement = mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
export const StaffMember = mongoose.model<IStaffMember>('StaffMember', StaffMemberSchema);
export const Event = mongoose.model<IEvent>('Event', EventSchema);
export const SiteSetting = mongoose.model<ISiteSetting>('SiteSetting', SiteSettingSchema);

// Export all models as a collection for convenience
export const MongoModels = {
  User,
  ContentPage,
  Announcement,
  StaffMember,
  Event,
  SiteSetting
};