import Navigation from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Users, Award } from "lucide-react";

export default function WhatsNew() {
  const activities = [
    {
      title: "Science Fair 2025",
      date: "March 15, 2025",
      description: "Annual science exhibition featuring student research projects and innovations",
      status: "upcoming",
      category: "Academic"
    },
    {
      title: "Sports Festival",
      date: "February 20-22, 2025",
      description: "Inter-grade level sports competition and athletic events",
      status: "upcoming",
      category: "Sports"
    },
    {
      title: "Cultural Night",
      date: "January 30, 2025",
      description: "Celebration of Filipino culture through music, dance, and arts",
      status: "completed",
      category: "Cultural"
    },
    {
      title: "Math Olympiad Training",
      date: "Ongoing",
      description: "Special training program for mathematics competition",
      status: "ongoing",
      category: "Academic"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-100 text-blue-800";
      case "ongoing": return "bg-green-100 text-green-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (category: string) => {
    switch (category) {
      case "Academic": return Award;
      case "Sports": return Users;
      case "Cultural": return Calendar;
      default: return Calendar;
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
              What's New!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Stay updated with the latest activities and events at San Jose National High School
            </p>
          </div>

          {/* Featured Update */}
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Latest Update
                  </Badge>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Enrollment for SY 2025-2026 Now Open!
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    We are now accepting applications for the upcoming school year. 
                    Join our community where students soar to new heights through quality education 
                    and holistic development.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Apply Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Students in classroom"
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activities Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Activities</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {activities.map((activity, index) => {
                const StatusIcon = getStatusIcon(activity.category);
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <StatusIcon className="h-5 w-5 text-blue-600" />
                          <CardTitle className="text-xl text-gray-900 dark:text-white">
                            {activity.title}
                          </CardTitle>
                        </div>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4" />
                          <span>{activity.date}</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{activity.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {activity.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <span className="font-medium">School Calendar</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">View upcoming events</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Users className="h-6 w-6 text-green-600" />
                  <span className="font-medium">Student Portal</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Access student resources</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Award className="h-6 w-6 text-yellow-600" />
                  <span className="font-medium">Achievements</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">View student awards</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}