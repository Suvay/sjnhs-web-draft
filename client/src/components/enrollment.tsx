import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Laptop, Phone, ExternalLink, Users } from "lucide-react";

export default function Enrollment() {
  const onlineEnrollmentLinks = [
    { grade: "Grade 7", url: "https://tinyurl.com/grade7SJNHS" },
    { grade: "Grade 8", url: "https://tinyurl.com/grade8SJNHS" },
    { grade: "Grade 9", url: "https://tinyurl.com/grade9SJNHS" },
    { grade: "Grade 10", url: "https://tiny.one/grade10SJNHS" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="enrollment" className="py-16 bg-white/70 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Enrollment Options</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Multiple ways to secure your spot at San Jose National High School</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Laptop className="text-blue-600 dark:text-blue-400 h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Online Enrollment</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Quick and convenient online registration</p>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 text-center">Click on your grade level to begin enrollment:</p>
                <div className="grid grid-cols-2 gap-3">
                  {onlineEnrollmentLinks.map((link) => (
                    <Button
                      key={link.grade}
                      asChild
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.grade}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="text-blue-600 dark:text-blue-400 h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Phone & Text Enrollment</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Enroll via text message or phone call</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
                Contact the personnel in charge for your grade level to complete enrollment by phone.
              </p>
              <div className="text-center">
                <Button
                  onClick={() => scrollToSection("staff")}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Users className="mr-2 h-4 w-4" />
                  View Staff Contacts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
