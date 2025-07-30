import { db } from "../server/db";
import { contentPages, announcements, staffMembers, events, siteSettings } from "../shared/schema";

async function populateWebsiteContent() {
  console.log("Populating website content...");
  
  try {
    // Create content pages for current website sections
    const contentPagesToInsert = [
      {
        pageKey: "home-hero",
        title: "Homepage Hero Section",
        content: JSON.stringify({
          title: "San Jose National High School",
          subtitle: "SOAR HIGH!",
          tagline: "San Jose High!",
          description: "Excellence in education since 1971. Empowering students to reach their full potential through quality education and holistic development.",
          backgroundImage: "/hero-bg.jpg",
          ctaText: "Learn More",
          ctaLink: "/about"
        }),
        isPublished: true,
        modifiedBy: 1
      },
      {
        pageKey: "about-overview",
        title: "About School Overview",
        content: JSON.stringify({
          mission: "To provide quality education that develops academically competent, morally upright, and socially responsible individuals.",
          vision: "A premier educational institution producing globally competitive graduates who are lifelong learners and contributors to society.",
          coreValues: ["Excellence", "Integrity", "Service", "Innovation", "Respect"],
          history: "Founded in 1971, San Jose National High School has been serving the community of San Jose, Sto. Tomas, Batangas for over 50 years, providing quality secondary education to thousands of students."
        }),
        isPublished: true,
        modifiedBy: 1
      },
      {
        pageKey: "enrollment-info",
        title: "Enrollment Information",
        content: JSON.stringify({
          enrollmentPeriod: "June 1 - August 31, 2025",
          requirements: [
            "Original and photocopy of Birth Certificate (NSO)",
            "Form 138 (Report Card)",
            "Certificate of Good Moral Character",
            "2x2 ID Pictures (4 copies)",
            "Medical Certificate",
            "Barangay Certificate of Residency"
          ],
          procedures: [
            "Submit complete requirements",
            "Fill out enrollment form",
            "Pay enrollment fees",
            "Get class schedule and room assignment"
          ],
          fees: {
            "Grade 7-10": "Free (Public School)",
            "Miscellaneous": "₱500.00 per semester"
          }
        }),
        isPublished: true,
        modifiedBy: 1
      },
      {
        pageKey: "learning-modalities",
        title: "Learning Modalities",
        content: JSON.stringify({
          modalities: [
            {
              name: "Face-to-Face Learning",
              description: "Traditional classroom instruction with direct teacher-student interaction",
              schedule: "Monday to Friday, 7:00 AM - 5:00 PM",
              requirements: "Complete health protocols compliance"
            },
            {
              name: "Blended Learning",
              description: "Combination of face-to-face and online learning modules",
              schedule: "Flexible schedule with required class sessions",
              requirements: "Reliable internet connection and device"
            },
            {
              name: "Modular Learning",
              description: "Self-learning modules for students in remote areas",
              schedule: "Self-paced with periodic consultations",
              requirements: "Printed modules and parent supervision"
            }
          ]
        }),
        isPublished: true,
        modifiedBy: 1
      }
    ];

    await db.insert(contentPages).values(contentPagesToInsert);
    console.log("Content pages created successfully!");

    // Create sample announcements
    const announcementsToInsert = [
      {
        title: "Enrollment for School Year 2025-2026 Now Open",
        content: "We are now accepting enrollees for the upcoming school year. Bring complete requirements and visit our registrar's office from 8:00 AM to 4:00 PM, Monday to Friday.",
        isPublished: true,
        createdBy: 1
      },
      {
        title: "Recognition Day Ceremony",
        content: "Join us in celebrating our students' achievements during the Recognition Day ceremony on March 15, 2025, at 2:00 PM in the school gymnasium.",
        isPublished: true,
        createdBy: 1
      },
      {
        title: "Updated Health and Safety Protocols",
        content: "Please be informed of the updated health and safety protocols for the current school year. All students and staff must comply with the guidelines.",
        isPublished: true,
        createdBy: 1
      }
    ];

    await db.insert(announcements).values(announcementsToInsert);
    console.log("Announcements created successfully!");

    // Create sample staff members
    const staffToInsert = [
      {
        name: "Ma. Teresa Santos",
        position: "School Principal",
        department: "Administration",
        email: "principal@sjnhs.edu.ph",
        phone: "09171234567",
        imageUrl: "/staff/principal.jpg",
        isActive: true,
        order: 1
      },
      {
        name: "Roberto Cruz",
        position: "Assistant Principal",
        department: "Administration",
        email: "assprincipal@sjnhs.edu.ph",
        phone: "09171234568",
        imageUrl: "/staff/assistant-principal.jpg",
        isActive: true,
        order: 2
      },
      {
        name: "Elena Rodriguez",
        position: "Head Teacher - Mathematics",
        department: "Mathematics Department",
        email: "math.head@sjnhs.edu.ph",
        phone: "09171234569",
        imageUrl: "/staff/math-head.jpg",
        isActive: true,
        order: 3
      },
      {
        name: "Jose Garcia",
        position: "Head Teacher - Science",
        department: "Science Department",
        email: "science.head@sjnhs.edu.ph",
        phone: "09171234570",
        imageUrl: "/staff/science-head.jpg",
        isActive: true,
        order: 4
      },
      {
        name: "Carmen Reyes",
        position: "Head Teacher - English",
        department: "English Department",
        email: "english.head@sjnhs.edu.ph",
        phone: "09171234571",
        imageUrl: "/staff/english-head.jpg",
        isActive: true,
        order: 5
      }
    ];

    await db.insert(staffMembers).values(staffToInsert);
    console.log("Staff members created successfully!");

    // Create sample events
    const eventsToInsert = [
      {
        title: "First Quarter Examination",
        description: "First quarter examinations for all grade levels. Students must bring valid ID and complete examination materials.",
        eventDate: new Date("2025-09-15T08:00:00"),
        location: "All Classrooms",
        isPublished: true,
        createdBy: 1
      },
      {
        title: "Teachers Day Celebration",
        description: "Special program to honor our dedicated teachers. Students are encouraged to participate in the various activities prepared.",
        eventDate: new Date("2025-10-05T14:00:00"),
        location: "School Gymnasium",
        isPublished: true,
        createdBy: 1
      },
      {
        title: "Intramurals 2025",
        description: "Annual sports competition among different grade levels. Various sports events including basketball, volleyball, and track and field.",
        eventDate: new Date("2025-11-20T07:00:00"),
        location: "School Grounds",
        isPublished: true,
        createdBy: 1
      },
      {
        title: "Science Fair",
        description: "Students showcase their innovative science projects and experiments. Open to all grade levels with different categories.",
        eventDate: new Date("2025-12-10T09:00:00"),
        location: "Science Laboratory",
        isPublished: true,
        createdBy: 1
      }
    ];

    await db.insert(events).values(eventsToInsert);
    console.log("Events created successfully!");

    // Create site settings
    const settingsToInsert = [
      { key: "site_title", value: "San Jose National High School", description: "Main website title" },
      { key: "site_description", value: "Excellence in education since 1971", description: "Brief school description" },
      { key: "school_address", value: "San Jose, Sto. Tomas, Batangas", description: "School address" },
      { key: "contact_phone", value: "043-778-1234", description: "School phone number" },
      { key: "contact_email", value: "info@sjnhs.edu.ph", description: "School email address" },
      { key: "office_hours", value: "Monday - Friday, 7:00 AM - 5:00 PM", description: "Office operating hours" },
      { key: "facebook_url", value: "https://facebook.com/sjnhsbatangas", description: "Facebook page URL" },
      { key: "youtube_url", value: "https://youtube.com/@sjnhsbatangas", description: "YouTube channel URL" },
      { key: "enrollment_status", value: "Open", description: "Current enrollment status" },
      { key: "enrollment_message", value: "Enrollment for School Year 2025-2026 is now open!", description: "Enrollment announcement" },
      { key: "enrollment_requirements", value: "Birth Certificate, Form 138, Good Moral Certificate, ID Pictures, Medical Certificate", description: "Enrollment requirements" }
    ];

    await db.insert(siteSettings).values(settingsToInsert);
    console.log("Site settings created successfully!");

    console.log("\n=== CONTENT POPULATION COMPLETE ===");
    console.log("The admin dashboard now contains all current website content that can be edited:");
    console.log("✓ Homepage content (hero section, school info)");
    console.log("✓ About page content (mission, vision, history)");
    console.log("✓ Enrollment information and requirements");
    console.log("✓ Learning modalities information");
    console.log("✓ School announcements and news");
    console.log("✓ Staff directory with contact information");
    console.log("✓ School events and calendar");
    console.log("✓ Site settings (contact info, social media, etc.)");
    console.log("\nSchool staff can now login and edit all this content through the admin dashboard!");
    
  } catch (error) {
    console.error("Error populating content:", error);
  } finally {
    process.exit(0);
  }
}

populateWebsiteContent();