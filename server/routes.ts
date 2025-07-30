import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { requireAuth, requireAdmin, requireEditor, hashPassword, comparePassword, generateToken, AuthRequest } from "./auth";
import { 
  insertUserSchema, 
  insertContentPageSchema, 
  insertAnnouncementSchema, 
  insertStaffMemberSchema, 
  insertEventSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = generateToken(user);
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/auth/me", requireAuth, async (req: AuthRequest, res) => {
    const { password: _, ...userWithoutPassword } = req.user!;
    res.json({ user: userWithoutPassword });
  });

  // User management routes
  app.get("/api/users", requireAuth, requireAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      const usersWithoutPasswords = users.map(({ password, ...user }) => user);
      res.json(usersWithoutPasswords);
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/users", requireAuth, requireAdmin, async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const hashedPassword = await hashPassword(userData.password);
      
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });

      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Create user error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Content management routes
  app.get("/api/content", async (req, res) => {
    try {
      const pages = await storage.getAllContentPages();
      res.json(pages);
    } catch (error) {
      console.error("Get content error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/content/:pageKey", async (req, res) => {
    try {
      const page = await storage.getContentPage(req.params.pageKey);
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
      res.json(page);
    } catch (error) {
      console.error("Get content page error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/content", requireAuth, requireEditor, async (req: AuthRequest, res) => {
    try {
      const pageData = insertContentPageSchema.parse({
        ...req.body,
        modifiedBy: req.user!.id
      });
      
      const page = await storage.createContentPage(pageData);
      res.status(201).json(page);
    } catch (error) {
      console.error("Create content page error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/content/:id", requireAuth, requireEditor, async (req: AuthRequest, res) => {
    try {
      const id = parseInt(req.params.id);
      const pageData = {
        ...req.body,
        modifiedBy: req.user!.id
      };
      
      const page = await storage.updateContentPage(id, pageData);
      res.json(page);
    } catch (error) {
      console.error("Update content page error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Announcements routes
  app.get("/api/announcements", async (req, res) => {
    try {
      const published = req.query.published === "true";
      const announcements = published 
        ? await storage.getPublishedAnnouncements()
        : await storage.getAllAnnouncements();
      res.json(announcements);
    } catch (error) {
      console.error("Get announcements error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/announcements", requireAuth, requireEditor, async (req: AuthRequest, res) => {
    try {
      const announcementData = insertAnnouncementSchema.parse({
        ...req.body,
        createdBy: req.user!.id
      });
      
      const announcement = await storage.createAnnouncement(announcementData);
      res.status(201).json(announcement);
    } catch (error) {
      console.error("Create announcement error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/announcements/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const announcement = await storage.updateAnnouncement(id, req.body);
      res.json(announcement);
    } catch (error) {
      console.error("Update announcement error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/announcements/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteAnnouncement(id);
      res.status(204).send();
    } catch (error) {
      console.error("Delete announcement error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Staff management routes
  app.get("/api/staff", async (req, res) => {
    try {
      const active = req.query.active === "true";
      const staff = active 
        ? await storage.getActiveStaffMembers()
        : await storage.getAllStaffMembers();
      res.json(staff);
    } catch (error) {
      console.error("Get staff error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/staff", requireAuth, requireEditor, async (req, res) => {
    try {
      const staffData = insertStaffMemberSchema.parse(req.body);
      const staff = await storage.createStaffMember(staffData);
      res.status(201).json(staff);
    } catch (error) {
      console.error("Create staff error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/staff/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const staff = await storage.updateStaffMember(id, req.body);
      res.json(staff);
    } catch (error) {
      console.error("Update staff error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/staff/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteStaffMember(id);
      res.status(204).send();
    } catch (error) {
      console.error("Delete staff error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Events routes
  app.get("/api/events", async (req, res) => {
    try {
      const published = req.query.published === "true";
      const events = published 
        ? await storage.getPublishedEvents()
        : await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      console.error("Get events error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/events", requireAuth, requireEditor, async (req: AuthRequest, res) => {
    try {
      const eventData = insertEventSchema.parse({
        ...req.body,
        createdBy: req.user!.id
      });
      
      const event = await storage.createEvent(eventData);
      res.status(201).json(event);
    } catch (error) {
      console.error("Create event error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/events/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.updateEvent(id, req.body);
      res.json(event);
    } catch (error) {
      console.error("Update event error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/events/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteEvent(id);
      res.status(204).send();
    } catch (error) {
      console.error("Delete event error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Site settings routes
  app.get("/api/settings", requireAuth, requireEditor, async (req, res) => {
    try {
      const settings = await storage.getAllSiteSettings();
      res.json(settings);
    } catch (error) {
      console.error("Get settings error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/settings/:key", requireAuth, requireEditor, async (req, res) => {
    try {
      const { key } = req.params;
      const { value } = req.body;
      const setting = await storage.updateSiteSetting(key, value);
      res.json(setting);
    } catch (error) {
      console.error("Update setting error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
