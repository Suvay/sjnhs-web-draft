import { db } from "../server/db";
import { users } from "../shared/schema";
import { hashPassword } from "../server/auth";
import { eq } from "drizzle-orm";

async function createDemoUser() {
  console.log("Creating demo user for demonstration...");
  
  try {
    // Check if demo user already exists
    const existingUser = await db.select().from(users).where(eq(users.username, "demo"));
    
    if (existingUser.length > 0) {
      console.log("Demo user already exists!");
      return;
    }

    // Create demo user (editor role for safer demonstration)
    const hashedPassword = await hashPassword("demo123");
    
    const [demoUser] = await db
      .insert(users)
      .values({
        username: "demo",
        password: hashedPassword,
        role: "editor",
      })
      .returning();

    console.log("Demo user created successfully!");
    console.log("=================================");
    console.log("DEMO CREDENTIALS FOR PRESENTATION:");
    console.log("Username: demo");
    console.log("Password: demo123");
    console.log("Role: editor (can edit content but not manage users)");
    console.log("=================================");
    console.log("Use these credentials to demonstrate the admin dashboard to school staff.");
    console.log("The demo user can safely edit all content without admin privileges.");
    
  } catch (error) {
    console.error("Error creating demo user:", error);
  } finally {
    process.exit(0);
  }
}

createDemoUser();