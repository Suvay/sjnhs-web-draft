import { 
  users, 
  contentPages, 
  announcements, 
  staffMembers, 
  events, 
  siteSettings,
  type User, 
  type InsertUser,
  type ContentPage,
  type InsertContentPage,
  type Announcement,
  type InsertAnnouncement,
  type StaffMember,
  type InsertStaffMember,
  type Event,
  type InsertEvent,
  type SiteSetting,
  type InsertSiteSetting
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  
  // Content Pages operations
  getContentPage(pageKey: string): Promise<ContentPage | undefined>;
  getAllContentPages(): Promise<ContentPage[]>;
  createContentPage(page: InsertContentPage): Promise<ContentPage>;
  updateContentPage(id: number, page: Partial<InsertContentPage>): Promise<ContentPage>;
  
  // Announcements operations
  getAllAnnouncements(): Promise<Announcement[]>;
  getPublishedAnnouncements(): Promise<Announcement[]>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  updateAnnouncement(id: number, announcement: Partial<InsertAnnouncement>): Promise<Announcement>;
  deleteAnnouncement(id: number): Promise<void>;
  
  // Staff Members operations
  getAllStaffMembers(): Promise<StaffMember[]>;
  getActiveStaffMembers(): Promise<StaffMember[]>;
  createStaffMember(staff: InsertStaffMember): Promise<StaffMember>;
  updateStaffMember(id: number, staff: Partial<InsertStaffMember>): Promise<StaffMember>;
  deleteStaffMember(id: number): Promise<void>;
  
  // Events operations
  getAllEvents(): Promise<Event[]>;
  getPublishedEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event>;
  deleteEvent(id: number): Promise<void>;
  
  // Site Settings operations
  getAllSiteSettings(): Promise<SiteSetting[]>;
  getSiteSetting(key: string): Promise<SiteSetting | undefined>;
  updateSiteSetting(key: string, value: string): Promise<SiteSetting>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  // Content Pages operations
  async getContentPage(pageKey: string): Promise<ContentPage | undefined> {
    const [page] = await db.select().from(contentPages).where(eq(contentPages.pageKey, pageKey));
    return page || undefined;
  }

  async getAllContentPages(): Promise<ContentPage[]> {
    return await db.select().from(contentPages);
  }

  async createContentPage(page: InsertContentPage): Promise<ContentPage> {
    const [newPage] = await db
      .insert(contentPages)
      .values(page)
      .returning();
    return newPage;
  }

  async updateContentPage(id: number, page: Partial<InsertContentPage>): Promise<ContentPage> {
    const [updatedPage] = await db
      .update(contentPages)
      .set({ ...page, lastModified: new Date() })
      .where(eq(contentPages.id, id))
      .returning();
    return updatedPage;
  }

  // Announcements operations
  async getAllAnnouncements(): Promise<Announcement[]> {
    return await db.select().from(announcements).orderBy(desc(announcements.createdAt));
  }

  async getPublishedAnnouncements(): Promise<Announcement[]> {
    return await db.select().from(announcements)
      .where(eq(announcements.isPublished, true))
      .orderBy(desc(announcements.createdAt));
  }

  async createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement> {
    const [newAnnouncement] = await db
      .insert(announcements)
      .values(announcement)
      .returning();
    return newAnnouncement;
  }

  async updateAnnouncement(id: number, announcement: Partial<InsertAnnouncement>): Promise<Announcement> {
    const [updatedAnnouncement] = await db
      .update(announcements)
      .set(announcement)
      .where(eq(announcements.id, id))
      .returning();
    return updatedAnnouncement;
  }

  async deleteAnnouncement(id: number): Promise<void> {
    await db.delete(announcements).where(eq(announcements.id, id));
  }

  // Staff Members operations
  async getAllStaffMembers(): Promise<StaffMember[]> {
    return await db.select().from(staffMembers).orderBy(staffMembers.order);
  }

  async getActiveStaffMembers(): Promise<StaffMember[]> {
    return await db.select().from(staffMembers)
      .where(eq(staffMembers.isActive, true))
      .orderBy(staffMembers.order);
  }

  async createStaffMember(staff: InsertStaffMember): Promise<StaffMember> {
    const [newStaff] = await db
      .insert(staffMembers)
      .values(staff)
      .returning();
    return newStaff;
  }

  async updateStaffMember(id: number, staff: Partial<InsertStaffMember>): Promise<StaffMember> {
    const [updatedStaff] = await db
      .update(staffMembers)
      .set(staff)
      .where(eq(staffMembers.id, id))
      .returning();
    return updatedStaff;
  }

  async deleteStaffMember(id: number): Promise<void> {
    await db.delete(staffMembers).where(eq(staffMembers.id, id));
  }

  // Events operations
  async getAllEvents(): Promise<Event[]> {
    return await db.select().from(events).orderBy(desc(events.eventDate));
  }

  async getPublishedEvents(): Promise<Event[]> {
    return await db.select().from(events)
      .where(eq(events.isPublished, true))
      .orderBy(desc(events.eventDate));
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db
      .insert(events)
      .values(event)
      .returning();
    return newEvent;
  }

  async updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event> {
    const [updatedEvent] = await db
      .update(events)
      .set(event)
      .where(eq(events.id, id))
      .returning();
    return updatedEvent;
  }

  async deleteEvent(id: number): Promise<void> {
    await db.delete(events).where(eq(events.id, id));
  }

  // Site Settings operations
  async getAllSiteSettings(): Promise<SiteSetting[]> {
    return await db.select().from(siteSettings);
  }

  async getSiteSetting(key: string): Promise<SiteSetting | undefined> {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return setting || undefined;
  }

  async updateSiteSetting(key: string, value: string): Promise<SiteSetting> {
    const [updatedSetting] = await db
      .insert(siteSettings)
      .values({ key, value, lastModified: new Date() })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: { value, lastModified: new Date() }
      })
      .returning();
    return updatedSetting;
  }
}

export const storage = new DatabaseStorage();
