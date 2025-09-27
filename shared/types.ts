import { z } from 'zod';
import { Types } from 'mongoose';

/**
 * Base interface for all MongoDB documents
 * Includes common fields like _id, createdAt, updatedAt
 */
export interface BaseDocument {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Base interface for serialized documents (after toJSON)
 * Uses string IDs for frontend consumption
 */
export interface SerializedDocument {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User interface for authentication and role management
 */
export interface User extends BaseDocument {
  username: string;
  email: string;
  password: string; // This will be hashed
  role: 'admin' | 'editor' | 'viewer';
  isActive: boolean;
  lastLogin?: Date;
}

/**
 * Serialized User interface (for API responses)
 */
export interface SerializedUser extends SerializedDocument {
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  isActive: boolean;
  lastLogin?: Date;
}

/**
 * Content page interface for managing website pages
 */
export interface ContentPage extends BaseDocument {
  pageKey: string; // Unique identifier like 'home', 'about', 'contact'
  title: string;
  content: Record<string, any>; // Flexible JSON content
  isPublished: boolean;
  modifiedBy: Types.ObjectId; // User ID reference
}

/**
 * Announcement interface for school news and updates
 */
export interface Announcement extends BaseDocument {
  title: string;
  content: string;
  summary?: string;
  isPublished: boolean;
  publishDate?: Date;
  expiryDate?: Date;
  createdBy: Types.ObjectId; // User ID reference
  tags: string[];
}

/**
 * Staff member interface for faculty directory
 */
export interface StaffMember extends BaseDocument {
  name: string;
  position: string;
  department: string;
  email?: string;
  phone?: string;
  imageUrl?: string;
  bio?: string;
  isActive: boolean;
  order: number; // For sorting display
}

/**
 * Event interface for school calendar and activities
 */
export interface Event extends BaseDocument {
  title: string;
  description?: string;
  eventDate: Date;
  endDate?: Date;
  location?: string;
  isPublished: boolean;
  createdBy: Types.ObjectId; // User ID reference
  attendees?: string[];
  category: 'academic' | 'sports' | 'cultural' | 'administrative' | 'other';
}

/**
 * Site settings interface for global configuration
 */
export interface SiteSetting extends BaseDocument {
  key: string; // Unique setting key
  value: string;
  description?: string;
  category: 'contact' | 'social' | 'enrollment' | 'general';
}

// ===== ZOD VALIDATION SCHEMAS =====

/**
 * User validation schemas
 */
export const createUserSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'editor', 'viewer']).default('viewer'),
  isActive: z.boolean().default(true),
});

export const updateUserSchema = createUserSchema.partial().omit({ password: true });

export const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(6),
});

/**
 * Content page validation schemas
 */
export const createContentPageSchema = z.object({
  pageKey: z.string().min(1).max(100),
  title: z.string().min(1).max(200),
  content: z.record(z.any()),
  isPublished: z.boolean().default(true),
});

export const updateContentPageSchema = createContentPageSchema.partial();

/**
 * Announcement validation schemas
 */
export const createAnnouncementSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  summary: z.string().max(500).optional(),
  isPublished: z.boolean().default(false),
  publishDate: z.string().datetime().optional(),
  expiryDate: z.string().datetime().optional(),
  tags: z.array(z.string()).default([]),
});

export const updateAnnouncementSchema = createAnnouncementSchema.partial();

/**
 * Staff member validation schemas
 */
export const createStaffMemberSchema = z.object({
  name: z.string().min(1).max(100),
  position: z.string().min(1).max(100),
  department: z.string().min(1).max(100),
  email: z.string().email().optional(),
  phone: z.string().max(20).optional(),
  imageUrl: z.string().url().optional(),
  bio: z.string().max(1000).optional(),
  isActive: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
});

export const updateStaffMemberSchema = createStaffMemberSchema.partial();

/**
 * Event validation schemas
 */
export const createEventSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  eventDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  location: z.string().max(200).optional(),
  isPublished: z.boolean().default(false),
  attendees: z.array(z.string()).default([]),
  category: z.enum(['academic', 'sports', 'cultural', 'administrative', 'other']).default('other'),
});

export const updateEventSchema = createEventSchema.partial();

/**
 * Site setting validation schemas
 */
export const createSiteSettingSchema = z.object({
  key: z.string().min(1).max(100),
  value: z.string().max(1000),
  description: z.string().max(500).optional(),
  category: z.enum(['contact', 'social', 'enrollment', 'general']).default('general'),
});

export const updateSiteSettingSchema = createSiteSettingSchema.partial();

// ===== TYPE EXPORTS =====

export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type ChangePassword = z.infer<typeof changePasswordSchema>;

export type CreateContentPage = z.infer<typeof createContentPageSchema>;
export type UpdateContentPage = z.infer<typeof updateContentPageSchema>;

export type CreateAnnouncement = z.infer<typeof createAnnouncementSchema>;
export type UpdateAnnouncement = z.infer<typeof updateAnnouncementSchema>;

export type CreateStaffMember = z.infer<typeof createStaffMemberSchema>;
export type UpdateStaffMember = z.infer<typeof updateStaffMemberSchema>;

export type CreateEvent = z.infer<typeof createEventSchema>;
export type UpdateEvent = z.infer<typeof updateEventSchema>;

export type CreateSiteSetting = z.infer<typeof createSiteSettingSchema>;
export type UpdateSiteSetting = z.infer<typeof updateSiteSettingSchema>;

/**
 * API Response types
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Query parameters for pagination and filtering
 */
export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  filter?: Record<string, any>;
}