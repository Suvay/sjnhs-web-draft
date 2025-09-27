import { Types } from 'mongoose';
import { 
  User, 
  ContentPage, 
  Announcement, 
  StaffMember, 
  Event, 
  SiteSetting,
  type IUser,
  type IContentPage,
  type IAnnouncement,
  type IStaffMember,
  type IEvent,
  type ISiteSetting
} from './mongodb-models';
import { IStorage } from './storage';
import { discordLogger } from './discord-logger';

// Type definitions for compatibility with existing interface
export interface MongoUser {
  id: number;
  username: string;
  password: string;
  role: string;
  createdAt: Date | null;
}

export interface MongoContentPage {
  id: number;
  pageKey: string;
  title: string;
  content: unknown;
  isPublished: boolean | null;
  lastModified: Date | null;
  modifiedBy: number | null;
}

export interface MongoAnnouncement {
  id: number;
  title: string;
  content: string;
  isPublished: boolean | null;
  createdAt: Date | null;
  createdBy: number | null;
}

export interface MongoStaffMember {
  id: number;
  name: string;
  position: string;
  department: string | null;
  email: string | null;
  phone: string | null;
  imageUrl: string | null;
  isActive: boolean | null;
  order: number | null;
}

export interface MongoEvent {
  id: number;
  title: string;
  description: string | null;
  eventDate: Date;
  location: string | null;
  isPublished: boolean | null;
  createdAt: Date | null;
  createdBy: number | null;
}

export interface MongoSiteSetting {
  id: number;
  key: string;
  value: string | null;
  description: string | null;
  lastModified: Date | null;
}

export class MongoDBStorage implements IStorage {
  
  // Helper method to convert MongoDB ObjectId to number for compatibility
  private objectIdToNumber(id: Types.ObjectId): number {
    return parseInt(id.toString().slice(-8), 16);
  }

  // Helper method to convert MongoDB document to compatible format
  private convertUserDoc(doc: IUser): MongoUser {
    return {
      id: this.objectIdToNumber(doc._id),
      username: doc.username,
      password: doc.password,
      role: doc.role,
      createdAt: doc.createdAt || null
    };
  }

  private convertContentPageDoc(doc: IContentPage): MongoContentPage {
    return {
      id: this.objectIdToNumber(doc._id),
      pageKey: doc.pageKey,
      title: doc.title,
      content: doc.content,
      isPublished: doc.isPublished,
      lastModified: doc.lastModified || null,
      modifiedBy: doc.modifiedBy ? this.objectIdToNumber(doc.modifiedBy as Types.ObjectId) : null
    };
  }

  private convertAnnouncementDoc(doc: IAnnouncement): MongoAnnouncement {
    return {
      id: this.objectIdToNumber(doc._id),
      title: doc.title,
      content: doc.content,
      isPublished: doc.isPublished,
      createdAt: doc.createdAt || null,
      createdBy: doc.createdBy ? this.objectIdToNumber(doc.createdBy as Types.ObjectId) : null
    };
  }

  private convertStaffMemberDoc(doc: IStaffMember): MongoStaffMember {
    return {
      id: this.objectIdToNumber(doc._id),
      name: doc.name,
      position: doc.position,
      department: doc.department || null,
      email: doc.email || null,
      phone: doc.phone || null,
      imageUrl: doc.imageUrl || null,
      isActive: doc.isActive,
      order: doc.order
    };
  }

  private convertEventDoc(doc: IEvent): MongoEvent {
    return {
      id: this.objectIdToNumber(doc._id),
      title: doc.title,
      description: doc.description || null,
      eventDate: doc.eventDate || new Date(),
      location: doc.location || null,
      isPublished: doc.isPublished,
      createdAt: doc.createdAt || null,
      createdBy: doc.createdBy ? this.objectIdToNumber(doc.createdBy as Types.ObjectId) : null
    };
  }

  private convertSiteSettingDoc(doc: ISiteSetting): MongoSiteSetting {
    return {
      id: this.objectIdToNumber(doc._id),
      key: doc.key,
      value: doc.value || null,
      description: doc.description || null,
      lastModified: doc.lastModified || null
    };
  }

  // User operations
  async getUser(id: number): Promise<MongoUser | undefined> {
    try {
      // For compatibility, we'll search by the converted ID or try to find by username
      const users = await User.find().lean();
      const user = users.find(u => this.objectIdToNumber(u._id) === id);
      return user ? this.convertUserDoc(user as IUser) : undefined;
    } catch (error) {
      console.error('MongoDB getUser error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB getUser');
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<MongoUser | undefined> {
    try {
      const user = await User.findOne({ username }).lean();
      return user ? this.convertUserDoc(user as IUser) : undefined;
    } catch (error) {
      console.error('MongoDB getUserByUsername error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB getUserByUsername');
      throw error;
    }
  }

  async createUser(userData: any): Promise<MongoUser> {
    try {
      const user = new User({
        username: userData.username,
        password: userData.password,
        role: userData.role || 'editor'
      });
      
      const savedUser = await user.save();
      await discordLogger.logServerEvent('MongoDB User Created', `New user created: ${userData.username}`);
      
      return this.convertUserDoc(savedUser);
    } catch (error) {
      console.error('MongoDB createUser error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB createUser');
      throw error;
    }
  }

  async getAllUsers(): Promise<MongoUser[]> {
    try {
      const users = await User.find().sort({ createdAt: -1 }).lean();
      return users.map(user => this.convertUserDoc(user as IUser));
    } catch (error) {
      console.error('MongoDB getAllUsers error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB getAllUsers');
      throw error;
    }
  }

  // Content Pages operations
  async getContentPage(pageKey: string): Promise<MongoContentPage | undefined> {
    try {
      const page = await ContentPage.findOne({ pageKey }).lean();
      return page ? this.convertContentPageDoc(page as IContentPage) : undefined;
    } catch (error) {
      console.error('MongoDB getContentPage error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB getContentPage');
      throw error;
    }
  }

  async getAllContentPages(): Promise<MongoContentPage[]> {
    try {
      const pages = await ContentPage.find().sort({ lastModified: -1 }).lean();
      return pages.map(page => this.convertContentPageDoc(page as IContentPage));
    } catch (error) {
      console.error('MongoDB getAllContentPages error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB getAllContentPages');
      throw error;
    }
  }

  async createContentPage(pageData: any): Promise<MongoContentPage> {
    try {
      const page = new ContentPage({
        pageKey: pageData.pageKey,
        title: pageData.title,
        content: pageData.content,
        isPublished: pageData.isPublished ?? true,
        modifiedBy: pageData.modifiedBy ? new Types.ObjectId() : undefined
      });
      
      const savedPage = await page.save();
      await discordLogger.logServerEvent('MongoDB Content Created', `New content page created: ${pageData.pageKey}`);
      
      return this.convertContentPageDoc(savedPage);
    } catch (error) {
      console.error('MongoDB createContentPage error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB createContentPage');
      throw error;
    }
  }

  async updateContentPage(id: number, pageData: any): Promise<MongoContentPage> {
    try {
      // Find by converted ID
      const pages = await ContentPage.find().lean();
      const targetPage = pages.find(p => this.objectIdToNumber(p._id) === id);
      
      if (!targetPage) {
        throw new Error(`Content page with id ${id} not found`);
      }

      const updatedPage = await ContentPage.findByIdAndUpdate(
        targetPage._id,
        {
          ...pageData,
          lastModified: new Date(),
          modifiedBy: pageData.modifiedBy ? new Types.ObjectId() : undefined
        },
        { new: true, lean: true }
      );

      if (!updatedPage) {
        throw new Error(`Failed to update content page with id ${id}`);
      }

      await discordLogger.logServerEvent('MongoDB Content Updated', `Content page updated: ${updatedPage.pageKey}`);
      
      return this.convertContentPageDoc(updatedPage as IContentPage);
    } catch (error) {
      console.error('MongoDB updateContentPage error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB updateContentPage');
      throw error;
    }
  }

  // Announcements operations
  async getAllAnnouncements(): Promise<MongoAnnouncement[]> {
    try {
      const announcements = await Announcement.find().sort({ createdAt: -1 }).lean();
      return announcements.map(ann => this.convertAnnouncementDoc(ann as IAnnouncement));
    } catch (error) {
      console.error('MongoDB getAllAnnouncements error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB getAllAnnouncements');
      throw error;
    }
  }

  async getPublishedAnnouncements(): Promise<MongoAnnouncement[]> {
    try {
      const announcements = await Announcement.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
      return announcements.map(ann => this.convertAnnouncementDoc(ann as IAnnouncement));
    } catch (error) {
      console.error('MongoDB getPublishedAnnouncements error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB getPublishedAnnouncements');
      throw error;
    }
  }

  async createAnnouncement(announcementData: any): Promise<MongoAnnouncement> {
    try {
      const announcement = new Announcement({
        title: announcementData.title,
        content: announcementData.content,
        isPublished: announcementData.isPublished ?? true,
        createdBy: new Types.ObjectId()
      });
      
      const savedAnnouncement = await announcement.save();
      await discordLogger.logServerEvent('MongoDB Announcement Created', `New announcement: ${announcementData.title}`);
      
      return this.convertAnnouncementDoc(savedAnnouncement);
    } catch (error) {
      console.error('MongoDB createAnnouncement error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB createAnnouncement');
      throw error;
    }
  }

  async updateAnnouncement(id: number, announcementData: any): Promise<MongoAnnouncement> {
    try {
      const announcements = await Announcement.find().lean();
      const targetAnnouncement = announcements.find(a => this.objectIdToNumber(a._id) === id);
      
      if (!targetAnnouncement) {
        throw new Error(`Announcement with id ${id} not found`);
      }

      const updatedAnnouncement = await Announcement.findByIdAndUpdate(
        targetAnnouncement._id,
        announcementData,
        { new: true, lean: true }
      );

      if (!updatedAnnouncement) {
        throw new Error(`Failed to update announcement with id ${id}`);
      }

      await discordLogger.logServerEvent('MongoDB Announcement Updated', `Announcement updated: ${updatedAnnouncement.title}`);
      
      return this.convertAnnouncementDoc(updatedAnnouncement as IAnnouncement);
    } catch (error) {
      console.error('MongoDB updateAnnouncement error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB updateAnnouncement');
      throw error;
    }
  }

  async deleteAnnouncement(id: number): Promise<void> {
    try {
      const announcements = await Announcement.find().lean();
      const targetAnnouncement = announcements.find(a => this.objectIdToNumber(a._id) === id);
      
      if (!targetAnnouncement) {
        throw new Error(`Announcement with id ${id} not found`);
      }

      await Announcement.findByIdAndDelete(targetAnnouncement._id);
      await discordLogger.logServerEvent('MongoDB Announcement Deleted', `Announcement deleted: ${targetAnnouncement.title}`);
    } catch (error) {
      console.error('MongoDB deleteAnnouncement error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB deleteAnnouncement');
      throw error;
    }
  }

  // Staff Members operations
  async getAllStaffMembers(): Promise<MongoStaffMember[]> {
    try {
      const staff = await StaffMember.find().sort({ order: 1, name: 1 }).lean();
      return staff.map(member => this.convertStaffMemberDoc(member as IStaffMember));
    } catch (error) {
      console.error('MongoDB getAllStaffMembers error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB getAllStaffMembers');
      throw error;
    }
  }

  async getActiveStaffMembers(): Promise<MongoStaffMember[]> {
    try {
      const staff = await StaffMember.find({ isActive: true }).sort({ order: 1, name: 1 }).lean();
      return staff.map(member => this.convertStaffMemberDoc(member as IStaffMember));
    } catch (error) {
      console.error('MongoDB getActiveStaffMembers error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB getActiveStaffMembers');
      throw error;
    }
  }

  async createStaffMember(staffData: any): Promise<MongoStaffMember> {
    try {
      const staff = new StaffMember({
        name: staffData.name,
        position: staffData.position,
        department: staffData.department,
        email: staffData.email,
        phone: staffData.phone,
        imageUrl: staffData.imageUrl,
        isActive: staffData.isActive ?? true,
        order: staffData.order || 0
      });
      
      const savedStaff = await staff.save();
      await discordLogger.logServerEvent('MongoDB Staff Created', `New staff member: ${staffData.name}`);
      
      return this.convertStaffMemberDoc(savedStaff);
    } catch (error) {
      console.error('MongoDB createStaffMember error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB createStaffMember');
      throw error;
    }
  }

  async updateStaffMember(id: number, staffData: any): Promise<MongoStaffMember> {
    try {
      const staff = await StaffMember.find().lean();
      const targetStaff = staff.find(s => this.objectIdToNumber(s._id) === id);
      
      if (!targetStaff) {
        throw new Error(`Staff member with id ${id} not found`);
      }

      const updatedStaff = await StaffMember.findByIdAndUpdate(
        targetStaff._id,
        staffData,
        { new: true, lean: true }
      );

      if (!updatedStaff) {
        throw new Error(`Failed to update staff member with id ${id}`);
      }

      await discordLogger.logServerEvent('MongoDB Staff Updated', `Staff member updated: ${updatedStaff.name}`);
      
      return this.convertStaffMemberDoc(updatedStaff as IStaffMember);
    } catch (error) {
      console.error('MongoDB updateStaffMember error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB updateStaffMember');
      throw error;
    }
  }

  async deleteStaffMember(id: number): Promise<void> {
    try {
      const staff = await StaffMember.find().lean();
      const targetStaff = staff.find(s => this.objectIdToNumber(s._id) === id);
      
      if (!targetStaff) {
        throw new Error(`Staff member with id ${id} not found`);
      }

      await StaffMember.findByIdAndDelete(targetStaff._id);
      await discordLogger.logServerEvent('MongoDB Staff Deleted', `Staff member deleted: ${targetStaff.name}`);
    } catch (error) {
      console.error('MongoDB deleteStaffMember error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB deleteStaffMember');
      throw error;
    }
  }

  // Events operations
  async getAllEvents(): Promise<MongoEvent[]> {
    try {
      const events = await Event.find().sort({ eventDate: 1 }).lean();
      return events.map(event => this.convertEventDoc(event as IEvent));
    } catch (error) {
      console.error('MongoDB getAllEvents error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB getAllEvents');
      throw error;
    }
  }

  async getPublishedEvents(): Promise<MongoEvent[]> {
    try {
      const events = await Event.find({ isPublished: true }).sort({ eventDate: 1 }).lean();
      return events.map(event => this.convertEventDoc(event as IEvent));
    } catch (error) {
      console.error('MongoDB getPublishedEvents error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB getPublishedEvents');
      throw error;
    }
  }

  async createEvent(eventData: any): Promise<MongoEvent> {
    try {
      const event = new Event({
        title: eventData.title,
        description: eventData.description,
        eventDate: new Date(eventData.eventDate),
        location: eventData.location,
        isPublished: eventData.isPublished ?? true,
        createdBy: new Types.ObjectId()
      });
      
      const savedEvent = await event.save();
      await discordLogger.logServerEvent('MongoDB Event Created', `New event: ${eventData.title}`);
      
      return this.convertEventDoc(savedEvent);
    } catch (error) {
      console.error('MongoDB createEvent error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB createEvent');
      throw error;
    }
  }

  async updateEvent(id: number, eventData: any): Promise<MongoEvent> {
    try {
      const events = await Event.find().lean();
      const targetEvent = events.find(e => this.objectIdToNumber(e._id) === id);
      
      if (!targetEvent) {
        throw new Error(`Event with id ${id} not found`);
      }

      const updateData = { ...eventData };
      if (eventData.eventDate) {
        updateData.eventDate = new Date(eventData.eventDate);
      }

      const updatedEvent = await Event.findByIdAndUpdate(
        targetEvent._id,
        updateData,
        { new: true, lean: true }
      );

      if (!updatedEvent) {
        throw new Error(`Failed to update event with id ${id}`);
      }

      await discordLogger.logServerEvent('MongoDB Event Updated', `Event updated: ${updatedEvent.title}`);
      
      return this.convertEventDoc(updatedEvent as IEvent);
    } catch (error) {
      console.error('MongoDB updateEvent error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB updateEvent');
      throw error;
    }
  }

  async deleteEvent(id: number): Promise<void> {
    try {
      const events = await Event.find().lean();
      const targetEvent = events.find(e => this.objectIdToNumber(e._id) === id);
      
      if (!targetEvent) {
        throw new Error(`Event with id ${id} not found`);
      }

      await Event.findByIdAndDelete(targetEvent._id);
      await discordLogger.logServerEvent('MongoDB Event Deleted', `Event deleted: ${targetEvent.title}`);
    } catch (error) {
      console.error('MongoDB deleteEvent error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB deleteEvent');
      throw error;
    }
  }

  // Site Settings operations
  async getAllSiteSettings(): Promise<MongoSiteSetting[]> {
    try {
      const settings = await SiteSetting.find().sort({ key: 1 }).lean();
      return settings.map(setting => this.convertSiteSettingDoc(setting as ISiteSetting));
    } catch (error) {
      console.error('MongoDB getAllSiteSettings error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB getAllSiteSettings');
      throw error;
    }
  }

  async getSiteSetting(key: string): Promise<MongoSiteSetting | undefined> {
    try {
      const setting = await SiteSetting.findOne({ key }).lean();
      return setting ? this.convertSiteSettingDoc(setting as ISiteSetting) : undefined;
    } catch (error) {
      console.error('MongoDB getSiteSetting error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB getSiteSetting');
      throw error;
    }
  }

  async updateSiteSetting(key: string, value: string): Promise<MongoSiteSetting> {
    try {
      const setting = await SiteSetting.findOneAndUpdate(
        { key },
        { 
          value, 
          lastModified: new Date() 
        },
        { 
          new: true, 
          upsert: true, 
          lean: true 
        }
      );

      if (!setting) {
        throw new Error(`Failed to update site setting with key ${key}`);
      }

      await discordLogger.logServerEvent('MongoDB Setting Updated', `Site setting updated: ${key}`);
      
      return this.convertSiteSettingDoc(setting as ISiteSetting);
    } catch (error) {
      console.error('MongoDB updateSiteSetting error:', error);
      await discordLogger.logError(error instanceof Error ? error : new Error(String(error)), 'MongoDB updateSiteSetting');
      throw error;
    }
  }
}

// Export singleton instance
export const mongoStorage = new MongoDBStorage();