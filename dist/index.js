var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  announcements: () => announcements,
  contentPages: () => contentPages,
  events: () => events,
  insertAnnouncementSchema: () => insertAnnouncementSchema,
  insertContentPageSchema: () => insertContentPageSchema,
  insertEventSchema: () => insertEventSchema,
  insertSiteSettingSchema: () => insertSiteSettingSchema,
  insertStaffMemberSchema: () => insertStaffMemberSchema,
  insertUserSchema: () => insertUserSchema,
  siteSettings: () => siteSettings,
  staffMembers: () => staffMembers,
  users: () => users
});
import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("admin"),
  // admin, editor, viewer
  createdAt: timestamp("created_at").defaultNow()
});
var contentPages = pgTable("content_pages", {
  id: serial("id").primaryKey(),
  pageKey: text("page_key").notNull().unique(),
  // home, about, contact, etc.
  title: text("title").notNull(),
  content: json("content"),
  // flexible JSON content for different page types
  isPublished: boolean("is_published").default(true),
  lastModified: timestamp("last_modified").defaultNow(),
  modifiedBy: integer("modified_by").references(() => users.id)
});
var announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  isPublished: boolean("is_published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: integer("created_by").references(() => users.id)
});
var staffMembers = pgTable("staff_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  department: text("department"),
  email: text("email"),
  phone: text("phone"),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
  order: integer("order").default(0)
  // for sorting
});
var events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  eventDate: timestamp("event_date").notNull(),
  location: text("location"),
  isPublished: boolean("is_published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: integer("created_by").references(() => users.id)
});
var siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value"),
  description: text("description"),
  lastModified: timestamp("last_modified").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true
});
var insertContentPageSchema = createInsertSchema(contentPages).omit({
  id: true,
  lastModified: true
});
var insertAnnouncementSchema = createInsertSchema(announcements).omit({
  id: true,
  createdAt: true
});
var insertStaffMemberSchema = createInsertSchema(staffMembers).omit({
  id: true
});
var insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true
});
var insertSiteSettingSchema = createInsertSchema(siteSettings).omit({
  id: true,
  lastModified: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, desc } from "drizzle-orm";
var DatabaseStorage = class {
  // User operations
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async getAllUsers() {
    return await db.select().from(users);
  }
  // Content Pages operations
  async getContentPage(pageKey) {
    const [page] = await db.select().from(contentPages).where(eq(contentPages.pageKey, pageKey));
    return page || void 0;
  }
  async getAllContentPages() {
    return await db.select().from(contentPages);
  }
  async createContentPage(page) {
    const [newPage] = await db.insert(contentPages).values(page).returning();
    return newPage;
  }
  async updateContentPage(id, page) {
    const [updatedPage] = await db.update(contentPages).set({ ...page, lastModified: /* @__PURE__ */ new Date() }).where(eq(contentPages.id, id)).returning();
    return updatedPage;
  }
  // Announcements operations
  async getAllAnnouncements() {
    return await db.select().from(announcements).orderBy(desc(announcements.createdAt));
  }
  async getPublishedAnnouncements() {
    return await db.select().from(announcements).where(eq(announcements.isPublished, true)).orderBy(desc(announcements.createdAt));
  }
  async createAnnouncement(announcement) {
    const [newAnnouncement] = await db.insert(announcements).values(announcement).returning();
    return newAnnouncement;
  }
  async updateAnnouncement(id, announcement) {
    const [updatedAnnouncement] = await db.update(announcements).set(announcement).where(eq(announcements.id, id)).returning();
    return updatedAnnouncement;
  }
  async deleteAnnouncement(id) {
    await db.delete(announcements).where(eq(announcements.id, id));
  }
  // Staff Members operations
  async getAllStaffMembers() {
    return await db.select().from(staffMembers).orderBy(staffMembers.order);
  }
  async getActiveStaffMembers() {
    return await db.select().from(staffMembers).where(eq(staffMembers.isActive, true)).orderBy(staffMembers.order);
  }
  async createStaffMember(staff) {
    const [newStaff] = await db.insert(staffMembers).values(staff).returning();
    return newStaff;
  }
  async updateStaffMember(id, staff) {
    const [updatedStaff] = await db.update(staffMembers).set(staff).where(eq(staffMembers.id, id)).returning();
    return updatedStaff;
  }
  async deleteStaffMember(id) {
    await db.delete(staffMembers).where(eq(staffMembers.id, id));
  }
  // Events operations
  async getAllEvents() {
    return await db.select().from(events).orderBy(desc(events.eventDate));
  }
  async getPublishedEvents() {
    return await db.select().from(events).where(eq(events.isPublished, true)).orderBy(desc(events.eventDate));
  }
  async createEvent(event) {
    const [newEvent] = await db.insert(events).values(event).returning();
    return newEvent;
  }
  async updateEvent(id, event) {
    const [updatedEvent] = await db.update(events).set(event).where(eq(events.id, id)).returning();
    return updatedEvent;
  }
  async deleteEvent(id) {
    await db.delete(events).where(eq(events.id, id));
  }
  // Site Settings operations
  async getAllSiteSettings() {
    return await db.select().from(siteSettings);
  }
  async getSiteSetting(key) {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return setting || void 0;
  }
  async updateSiteSetting(key, value) {
    const [updatedSetting] = await db.insert(siteSettings).values({ key, value, lastModified: /* @__PURE__ */ new Date() }).onConflictDoUpdate({
      target: siteSettings.key,
      set: { value, lastModified: /* @__PURE__ */ new Date() }
    }).returning();
    return updatedSetting;
  }
};
var storage = new DatabaseStorage();

// server/auth.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
var JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this-in-production";
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}
async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
}
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access token required" });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    const user = await storage.getUser(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}
function requireEditor(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required" });
  }
  if (!["admin", "editor"].includes(req.user.role)) {
    return res.status(403).json({ message: "Editor access required" });
  }
  next();
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/auth/login", async (req, res) => {
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
  app2.get("/api/auth/me", requireAuth, async (req, res) => {
    const { password: _, ...userWithoutPassword } = req.user;
    res.json({ user: userWithoutPassword });
  });
  app2.get("/api/users", requireAuth, requireAdmin, async (req, res) => {
    try {
      const users2 = await storage.getAllUsers();
      const usersWithoutPasswords = users2.map(({ password, ...user }) => user);
      res.json(usersWithoutPasswords);
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/users", requireAuth, requireAdmin, async (req, res) => {
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
  app2.get("/api/content", async (req, res) => {
    try {
      const pages = await storage.getAllContentPages();
      res.json(pages);
    } catch (error) {
      console.error("Get content error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/content/:pageKey", async (req, res) => {
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
  app2.post("/api/content", requireAuth, requireEditor, async (req, res) => {
    try {
      const pageData = insertContentPageSchema.parse({
        ...req.body,
        modifiedBy: req.user.id
      });
      const page = await storage.createContentPage(pageData);
      res.status(201).json(page);
    } catch (error) {
      console.error("Create content page error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.put("/api/content/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const pageData = {
        ...req.body,
        modifiedBy: req.user.id
      };
      const page = await storage.updateContentPage(id, pageData);
      res.json(page);
    } catch (error) {
      console.error("Update content page error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/announcements", async (req, res) => {
    try {
      const published = req.query.published === "true";
      const announcements2 = published ? await storage.getPublishedAnnouncements() : await storage.getAllAnnouncements();
      res.json(announcements2);
    } catch (error) {
      console.error("Get announcements error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/announcements", requireAuth, requireEditor, async (req, res) => {
    try {
      const announcementData = insertAnnouncementSchema.parse({
        ...req.body,
        createdBy: req.user.id
      });
      const announcement = await storage.createAnnouncement(announcementData);
      res.status(201).json(announcement);
    } catch (error) {
      console.error("Create announcement error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.put("/api/announcements/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const announcement = await storage.updateAnnouncement(id, req.body);
      res.json(announcement);
    } catch (error) {
      console.error("Update announcement error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.delete("/api/announcements/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteAnnouncement(id);
      res.status(204).send();
    } catch (error) {
      console.error("Delete announcement error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/staff", async (req, res) => {
    try {
      const active = req.query.active === "true";
      const staff = active ? await storage.getActiveStaffMembers() : await storage.getAllStaffMembers();
      res.json(staff);
    } catch (error) {
      console.error("Get staff error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/staff", requireAuth, requireEditor, async (req, res) => {
    try {
      const staffData = insertStaffMemberSchema.parse(req.body);
      const staff = await storage.createStaffMember(staffData);
      res.status(201).json(staff);
    } catch (error) {
      console.error("Create staff error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.put("/api/staff/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const staff = await storage.updateStaffMember(id, req.body);
      res.json(staff);
    } catch (error) {
      console.error("Update staff error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.delete("/api/staff/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteStaffMember(id);
      res.status(204).send();
    } catch (error) {
      console.error("Delete staff error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/events", async (req, res) => {
    try {
      const published = req.query.published === "true";
      const events2 = published ? await storage.getPublishedEvents() : await storage.getAllEvents();
      res.json(events2);
    } catch (error) {
      console.error("Get events error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/events", requireAuth, requireEditor, async (req, res) => {
    try {
      const eventData = insertEventSchema.parse({
        ...req.body,
        createdBy: req.user.id
      });
      const event = await storage.createEvent(eventData);
      res.status(201).json(event);
    } catch (error) {
      console.error("Create event error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.put("/api/events/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.updateEvent(id, req.body);
      res.json(event);
    } catch (error) {
      console.error("Update event error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.delete("/api/events/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteEvent(id);
      res.status(204).send();
    } catch (error) {
      console.error("Delete event error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/settings", requireAuth, requireEditor, async (req, res) => {
    try {
      const settings = await storage.getAllSiteSettings();
      res.json(settings);
    } catch (error) {
      console.error("Get settings error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.put("/api/settings/:key", requireAuth, requireEditor, async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
