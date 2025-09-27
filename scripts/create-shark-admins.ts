import { db } from "../server/db";
import { users } from "../shared/schema";
import { hashPassword } from "../server/auth";
import { eq } from "drizzle-orm";

async function createSharkAdmins() {
  console.log("Creating Shark Industry admin users...");
  
  const adminUsernames = [
    "Squidygamingg", 
    "Sharkuses", 
    "MicoleFrancineMC", 
    "SophiaNicoleAG"
  ];

  try {
    for (const username of adminUsernames) {
      // Check if user already exists
      const existingUser = await db.select().from(users).where(eq(users.username, username));
      
      if (existingUser.length > 0) {
        console.log(`Admin user ${username} already exists, skipping...`);
        continue;
      }

      // Create password with pattern: username@SharkIndustryDevelopment
      const password = `${username}@SharkIndustryDevelopment`;
      const hashedPassword = await hashPassword(password);
      
      const [adminUser] = await db
        .insert(users)
        .values({
          username: username,
          password: hashedPassword,
          role: "admin",
        })
        .returning();

      console.log(`✓ Admin user created: ${username}`);
    }
    
    console.log("\nAll Shark Industry admin users created successfully!");
    console.log("Password pattern: <username>@SharkIndustryDevelopment");
    console.log("IMPORTANT: Consider changing passwords after first login for security!");
    
  } catch (error) {
    console.error("Error creating admin users:", error);
  } finally {
    process.exit(0);
  }
}

createSharkAdmins();