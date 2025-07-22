import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export default function Updates() {
  const enrollmentLinks = [
    { grade: "Grade 7", url: "https://tinyurl.com/grade7SJNHS", description: "New Student Registration" },
    { grade: "Grade 8", url: "https://tinyurl.com/grade8SJNHS", description: "Continuing Students" },
    { grade: "Grade 9", url: "https://tinyurl.com/grade9SJNHS", description: "Junior High School" },
    { grade: "Grade 10", url: "https://tiny.one/grade10SJNHS", description: "Senior Registration" },
  ];

  return (
    <section id="updates" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Updates!</h2>
          <p className="text-xl text-gray-600">Stay informed with the latest news and announcements</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Update Card */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-8">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                  alt="Students studying together in library"
                  className="rounded-lg w-full h-64 object-cover mb-6"
                />
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Enroll now and be part of our community!
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Welcome to our school's page for admission! We encourage you to do the{" "}
                  <strong>online enrollment</strong> for the school year 2024 - 2025. Join our vibrant learning community where students soar to new heights.
                </p>
                
                <div className="space-y-3">
                  {enrollmentLinks.map((link) => (
                    <div key={link.grade} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {link.grade}
                        </Badge>
                        <span className="text-gray-700">{link.description}</span>
                      </div>
                      <Button
                        asChild
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          Enroll Now
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Updates */}
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
                  alt="Graduation ceremony with students celebrating"
                  className="rounded-lg w-full h-40 object-cover mb-4"
                />
                <h4 className="font-bold text-gray-900 mb-2">Graduation Ceremony 2024</h4>
                <p className="text-gray-600 text-sm">Celebrating our graduating class and their achievements.</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1580894894513-541e068a3e2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
                  alt="Teacher instructing students in modern classroom"
                  className="rounded-lg w-full h-40 object-cover mb-4"
                />
                <h4 className="font-bold text-gray-900 mb-2">Learning Delivery Modality</h4>
                <p className="text-gray-600 text-sm">Information about our flexible learning approaches for all students.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
