import Navigation from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Users, 
  Target, 
  Eye, 
  Award,
  FileText,
  Download
} from "lucide-react";

export default function About() {
  const achievements = [
    { year: "2024", title: "Excellence in Education Award", category: "Academic" },
    { year: "2023", title: "Outstanding Science Program", category: "STEM" },
    { year: "2023", title: "Community Service Recognition", category: "Service" },
    { year: "2022", title: "Sports Championship", category: "Athletics" }
  ];

  const organizationalChart = [
    { position: "Principal", name: "Dr. Maria Santos", department: "Administration" },
    { position: "Vice Principal", name: "Mr. Jose Cruz", department: "Academic Affairs" },
    { position: "Academic Coordinator", name: "Ms. Ana Reyes", department: "Curriculum" },
    { position: "Student Affairs Officer", name: "Mr. Carlos Lopez", department: "Student Services" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About Us
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Learn more about San Jose National High School
            </p>
          </div>

          {/* School History */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-2xl text-gray-900 dark:text-white">School History</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    San Jose National High School was established in 1985 with the vision of providing 
                    quality secondary education to the youth of San Jose, Batangas. What started as a 
                    small institution with just 150 students has grown into a comprehensive high school 
                    serving over 2,000 students.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Throughout the years, our school has maintained its commitment to academic excellence, 
                    character development, and community service. We have consistently produced graduates 
                    who excel in various fields and contribute meaningfully to society.
                  </p>
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                    alt="Historical photo of San Jose National High School"
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mission and Vision */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Target className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-xl text-gray-900 dark:text-white">Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  To provide quality, accessible, and relevant secondary education that develops 
                  critical thinking, moral values, and life skills necessary for students to become 
                  productive citizens and lifelong learners in a rapidly changing world.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Eye className="h-6 w-6 text-purple-600" />
                  <CardTitle className="text-xl text-gray-900 dark:text-white">Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  A premier institution that nurtures globally competitive, morally upright, and 
                  socially responsible graduates who are empowered to contribute to nation-building 
                  and sustainable development.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Citizens Charter */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-orange-600" />
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Citizens Charter</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our Citizens Charter outlines our commitment to transparency, accountability, 
                  and excellence in public service. We pledge to deliver quality educational 
                  services with integrity and professionalism.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Our Commitment</h4>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• Quality education for all students</li>
                      <li>• Timely and efficient services</li>
                      <li>• Fair and equitable treatment</li>
                      <li>• Continuous improvement</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Your Rights</h4>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• Access to information</li>
                      <li>• Complaint and feedback mechanism</li>
                      <li>• Privacy and data protection</li>
                      <li>• Quality educational services</li>
                    </ul>
                  </div>
                </div>

                <Button variant="outline" className="mt-4">
                  <Download className="h-4 w-4 mr-2" />
                  Download Full Citizens Charter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Organizational Chart */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Organizational Chart</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {organizationalChart.map((person, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{person.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{person.position}</p>
                      </div>
                      <Badge variant="outline">{person.department}</Badge>
                    </div>
                    {index < organizationalChart.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-6">
                <Download className="h-4 w-4 mr-2" />
                Download Complete Organizational Chart
              </Button>
            </CardContent>
          </Card>

          {/* School Report Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-yellow-600" />
                <CardTitle className="text-2xl text-gray-900 dark:text-white">
                  School Report Card for SY 2025–2026
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our annual school report card demonstrates our commitment to transparency 
                  and continuous improvement. Here are some of our key achievements and statistics.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400">98%</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Graduation Rate</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="text-2xl font-bold text-green-600 dark:text-green-400">95%</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">College Enrollment</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h4 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">2,150</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="text-2xl font-bold text-purple-600 dark:text-purple-400">120</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Faculty Members</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Recent Achievements</h4>
                  <div className="space-y-2">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">{achievement.title}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">({achievement.year})</span>
                        </div>
                        <Badge variant="outline">{achievement.category}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Complete Report Card
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}