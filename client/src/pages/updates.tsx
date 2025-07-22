import Navigation from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Megaphone, 
  FileText, 
  Play,
  Clock,
  ExternalLink
} from "lucide-react";

export default function Updates() {
  const calendarEvents = [
    {
      title: "First Quarter Examinations",
      date: "February 10-14, 2025",
      type: "Academic",
      status: "upcoming"
    },
    {
      title: "Science Fair",
      date: "March 15, 2025",
      type: "Event",
      status: "upcoming"
    },
    {
      title: "Parent-Teacher Conference",
      date: "July 12, 2025",
      type: "Meeting",
      status: "Ended"
    }
  ];

  const announcements = [
    {
      title: "Enrollment for SY 2025-2026 Extended",
      content: "Due to popular demand, enrollment period has been extended until February 28, 2025.",
      date: "January 20, 2025",
      priority: "high"
    },
    {
      title: "New Library Hours",
      content: "The school library will now be open from 7:00 AM to 6:00 PM starting February 1, 2025.",
      date: "January 18, 2025",
      priority: "medium"
    },
    {
      title: "Sports Tryouts Beginning",
      content: "Tryouts for basketball, volleyball, and track and field teams start February 5, 2025.",
      date: "January 15, 2025",
      priority: "low"
    }
  ];

  const bulletinItems = [
    {
      title: "Outstanding Academic Achievement",
      content: "Congratulations to our Grade 10 students for achieving 98% passing rate in the National Achievement Test.",
      category: "Achievement"
    },
    {
      title: "Community Service Project",
      content: "Our students participated in a coastal cleanup activity, collecting over 500kg of waste.",
      category: "Community"
    },
    {
      title: "New Computer Laboratory",
      content: "The school has inaugurated a new state-of-the-art computer laboratory with 40 units.",
      category: "Facility"
    }
  ];

  const videos = [
    {
      title: "School Virtual Tour 2025",
      description: "Take a virtual tour of our campus facilities and classrooms",
      duration: "5:32",
      thumbnail: "https://via.placeholder.com/400x225/3B82F6/FFFFFF?text=Virtual+Tour"
    },
    {
      title: "Graduation Ceremony 2024 Highlights",
      description: "Highlights from our 2024 graduation ceremony",
      duration: "8:15",
      thumbnail: "https://via.placeholder.com/400x225/F59E0B/FFFFFF?text=Graduation"
    },
    {
      title: "Science Fair Winners 2024",
      description: "Meet our science fair winners and their innovative projects",
      duration: "6:47",
      thumbnail: "https://via.placeholder.com/400x225/10B981/FFFFFF?text=Science+Fair"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
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
              Updates
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Stay informed with the latest news, events, and announcements
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar of Events */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-6 w-6 text-blue-600" />
                    <CardTitle className="text-2xl text-gray-900 dark:text-white">Calendar of Events</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {calendarEvents.map((event, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{event.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{event.date}</span>
                          </div>
                        </div>
                        <Badge variant="outline">{event.type}</Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Full Calendar
                  </Button>
                </CardContent>
              </Card>

              {/* Announcements */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Megaphone className="h-6 w-6 text-orange-600" />
                    <CardTitle className="text-2xl text-gray-900 dark:text-white">Announcements</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {announcements.map((announcement, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{announcement.title}</h4>
                          <Badge className={getPriorityColor(announcement.priority)}>
                            {announcement.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{announcement.content}</p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{announcement.date}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Megaphone className="h-4 w-4 mr-2" />
                    View All Announcements
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Bulletin */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-6 w-6 text-green-600" />
                    <CardTitle className="text-xl text-gray-900 dark:text-white">Bulletin</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bulletinItems.map((item, index) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium text-gray-900 dark:text-white text-sm">{item.title}</h5>
                          <Badge variant="outline" className="text-xs">{item.category}</Badge>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{item.content}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    <FileText className="h-3 w-3 mr-2" />
                    Read More
                  </Button>
                </CardContent>
              </Card>

              {/* Videos */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Play className="h-6 w-6 text-purple-600" />
                    <CardTitle className="text-xl text-gray-900 dark:text-white">Videos</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {videos.map((video, index) => (
                      <div key={index} className="group cursor-pointer">
                        <div className="relative">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-24 object-cover rounded"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 rounded flex items-center justify-center group-hover:bg-opacity-50 transition-all">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                          <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <div className="mt-2">
                          <h5 className="font-medium text-gray-900 dark:text-white text-sm">{video.title}</h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{video.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    <ExternalLink className="h-3 w-3 mr-2" />
                    YouTube Channel
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}