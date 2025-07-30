import Navigation from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { 
  Calendar, 
  Megaphone, 
  FileText, 
  Play,
  Clock,
  ExternalLink
} from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
  createdBy: number;
}

interface Event {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  isPublished: boolean;
  createdBy: number;
}

export default function Updates() {
  // Fetch real announcements from database
  const { data: announcements = [], isLoading: announcementsLoading } = useQuery({
    queryKey: ["/api/announcements"],
  });

  // Fetch real events from database
  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ["/api/events"],
  });

  // Filter for published announcements and events
  const publishedAnnouncements = announcements.filter((announcement: Announcement) => announcement.isPublished);
  const publishedEvents = events.filter((event: Event) => event.isPublished);

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

  const getEventStatus = (eventDate: string) => {
    const now = new Date();
    const event = new Date(eventDate);
    
    if (event > now) return "upcoming";
    if (event.toDateString() === now.toDateString()) return "ongoing";
    return "ended";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100";
      case "ongoing": return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100";
      case "ended": return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-100";
      default: return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-100";
    }
  };

  if (announcementsLoading || eventsLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">Loading updates...</div>
        </div>
      </div>
    );
  }

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
                    {publishedEvents.length > 0 ? publishedEvents.map((event: Event) => {
                      const status = getEventStatus(event.eventDate);
                      return (
                        <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{event.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(event.eventDate).toLocaleDateString()} • {event.location}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{event.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(status)}>{status}</Badge>
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="text-center py-4 text-gray-600 dark:text-gray-400">
                        No events scheduled at this time.
                      </div>
                    )}
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
                    {publishedAnnouncements.length > 0 ? publishedAnnouncements.map((announcement: Announcement) => (
                      <div key={announcement.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{announcement.title}</h4>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            New
                          </Badge>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{announcement.content}</p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(announcement.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    )) : (
                      <div className="text-center py-4 text-gray-600 dark:text-gray-400">
                        No announcements at this time.
                      </div>
                    )}
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
                </CardContent>
              </Card>

              {/* Video Gallery */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Play className="h-6 w-6 text-purple-600" />
                    <CardTitle className="text-xl text-gray-900 dark:text-white">Video Gallery</CardTitle>
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
                            className="w-full h-32 object-cover rounded"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded">
                            <Play className="h-8 w-8 text-white" />
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <div className="mt-2">
                          <h6 className="font-medium text-sm text-gray-900 dark:text-white">{video.title}</h6>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{video.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View More Videos
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