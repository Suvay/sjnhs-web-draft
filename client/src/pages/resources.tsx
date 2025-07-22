import Navigation from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Download, 
  FileText, 
  BookOpen, 
  Search,
  ExternalLink,
  Calendar
} from "lucide-react";

export default function Resources() {
  const issuances = [
    {
      title: "Department Order 123-2025",
      description: "Guidelines for School Year 2025-2026 Operations",
      date: "January 15, 2025",
      category: "Administrative",
      downloads: 245
    },
    {
      title: "Memorandum 45-2025",
      description: "Health and Safety Protocols Update",
      date: "January 10, 2025",
      category: "Health",
      downloads: 189
    },
    {
      title: "Circular 78-2024",
      description: "Academic Calendar Adjustments",
      date: "December 20, 2024",
      category: "Academic",
      downloads: 356
    }
  ];

  const downloadableForms = [
    {
      title: "Enrollment Form 2025-2026",
      description: "Complete enrollment application form",
      category: "Enrollment",
      downloads: 1250
    },
    {
      title: "Transfer Credentials Request",
      description: "Form for requesting student records",
      category: "Records",
      downloads: 423
    },
    {
      title: "Medical Certificate Form",
      description: "Required health documentation",
      category: "Health",
      downloads: 567
    },
    {
      title: "Parent Consent Form",
      description: "Permission forms for various activities",
      category: "Activities",
      downloads: 789
    }
  ];

  const learningReferences = [
    {
      title: "Grade 7 Science Module",
      description: "Comprehensive science learning materials",
      subject: "Science",
      grade: "Grade 7",
      downloads: 2340
    },
    {
      title: "Mathematics Workbook - Grade 8",
      description: "Practice exercises and problem solving",
      subject: "Mathematics",
      grade: "Grade 8",
      downloads: 1980
    },
    {
      title: "English Language Arts Guide",
      description: "Reading comprehension and writing skills",
      subject: "English",
      grade: "All Grades",
      downloads: 1567
    },
    {
      title: "Filipino Learning Materials",
      description: "Wika at Panitikang Filipino resources",
      subject: "Filipino",
      grade: "All Grades",
      downloads: 1234
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "administrative": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "health": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "academic": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "enrollment": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "records": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      case "activities": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject.toLowerCase()) {
      case "science": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "mathematics": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "english": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "filipino": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Resources
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Access important documents, forms, and learning materials
            </p>
          </div>

          {/* Search */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="relative max-w-md mx-auto">
                <Input
                  placeholder="Search resources..."
                  className="pl-10 bg-gray-50 dark:bg-gray-800"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </CardContent>
          </Card>

          {/* Issuances */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Issuances</CardTitle>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Official department orders, memorandums, and circulars
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issuances.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                        <Badge className={getCategoryColor(item.category)}>
                          {item.category}
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{item.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{item.date}</span>
                        </div>
                        <span>{item.downloads} downloads</span>
                      </div>
                    </div>
                    <Button size="sm" className="ml-4">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View All Issuances
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Downloadable Forms */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Download className="h-6 w-6 text-green-600" />
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Downloadable Forms</CardTitle>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Essential forms for students, parents, and staff
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {downloadableForms.map((form, index) => (
                  <Card key={index} className="border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{form.title}</h4>
                        <Badge className={getCategoryColor(form.category)} variant="outline">
                          {form.category}
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{form.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {form.downloads} downloads
                        </span>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Get Form
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning References */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-purple-600" />
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Learning References</CardTitle>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Educational materials and resources for students
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {learningReferences.map((resource, index) => (
                  <Card key={index} className="border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{resource.title}</h4>
                        <div className="flex space-x-1">
                          <Badge className={getSubjectColor(resource.subject)} variant="outline">
                            {resource.subject}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {resource.grade}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {resource.downloads} downloads
                          </span>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Access
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse All Learning Materials
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}