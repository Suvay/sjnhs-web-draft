/**
 * Model exports
 * Central export file for all Mongoose models
 */

export { UserModel, type IUserDocument } from './User';
export { ContentPageModel, type IContentPageDocument } from './ContentPage';
export { AnnouncementModel, type IAnnouncementDocument } from './Announcement';
export { StaffMemberModel, type IStaffMemberDocument } from './StaffMember';
export { EventModel, type IEventDocument } from './Event';
export { SiteSettingModel, type ISiteSettingDocument } from './SiteSetting';

/**
 * Initialize database connection and models
 * Call this function to ensure all models are registered
 */
export async function initializeModels(): Promise<void> {
  // Import all models to ensure they are registered with Mongoose
  await import('./User');
  await import('./ContentPage');
  await import('./Announcement');
  await import('./StaffMember');
  await import('./Event');
  await import('./SiteSetting');
  
  console.log('✅ All MongoDB models initialized');
}