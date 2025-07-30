import { db } from "../server/db";
import { users } from "../shared/schema";
import { hashPassword } from "../server/auth";
import { eq } from "drizzle-orm";

async function createAdminUser() {
  console.log("Creating admin user...");
  
  try {
    // Check if admin user already exists
    const existingUser = await db.select().from(users).where(eq(users.username, "admin"));
    
    if (existingUser.length > 0) {
      console.log("Admin user already exists!");
      return;
    }

    // Create admin user
    const hashedPassword = await hashPassword("admin123");
    
    const [adminUser] = await db
      .insert(users)
      .values({
        username: "admin",
        password: hashedPassword,
        role: "admin",
      })
      .returning();

    console.log("Admin user created successfully!");
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("IMPORTANT: Please change the password after first login!");
    
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    process.exit(0);
  }
}

createAdminUser();