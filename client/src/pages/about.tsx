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
    { year: "2025", title: "Won against Global Esports", category: "Esports" },
    { year: "2023", title: "Outstanding Science Program", category: "TEAM SECRET FILL" },
    { year: "2023", title: "Community Service Recognition", category: "TEAM SECRET FILL" },
    { year: "2022", title: "Sports Championship", category: "TEAM SECRET FILL" }
  ];

  const organizationalChart = [
    { position: "POSITION", name: "SECRET NAME", department: "Administration" },
    { position: "POSITION", name: "SECRET NAME", department: "Curriculum" },
    { position: "POSITION", name: "SECRET NAME", department: "Student Services" }
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
                    San Jose National High School was established in 1971 with the vision of providing 
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
                    src="https://via.placeholder.com/600x300/1E40AF/FFFFFF?text=School+History"
                    alt="Historical photo of San Jose National High School"
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DepEd Vision */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Eye className="h-6 w-6 text-purple-600" />
                <CardTitle className="text-2xl text-gray-900 dark:text-white">THE DEPED VISION</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We dream of Filipinos who passionately love their country and whose values and competencies enable them to realize their full potential and contribute meaningfully to building the nation.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                As a learner-centered public institution, the Department of Education continuously improves itself to better serve its stakeholder.
              </p>
            </CardContent>
          </Card>

          {/* DepEd Mission */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-green-600" />
                <CardTitle className="text-2xl text-gray-900 dark:text-white">THE DEPED MISSION</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                To protect and promote the right of every Filipino to quality, equitable, culture-based, and complete basic education where:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• <strong>Students</strong> learn in a child-friendly, gender-sensitive, safe, and motivating environment.</li>
                <li>• <strong>Teachers</strong> facilitate learning and constantly nurture every learner.</li>
                <li>• <strong>Administrators and staff</strong>, as stewards of the institution, ensure an enabling and supportive environment for effective learning to happen.</li>
                <li>• <strong>Family, community, and other stakeholders</strong> are actively engaged and share responsibility for developing lifelong learners.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Core Values */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-2xl text-gray-900 dark:text-white">OUR CORE VALUES</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {['Maka-Diyos', 'Maka-tao', 'Makakalikasan', 'Makabansa'].map((value, index) => (
                  <div key={index} className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-bold text-blue-600 dark:text-blue-400">{value}</h4>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quality Policies */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">SCHOOL QUALITY POLICY</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We, at San Jose National High School, commit ourselves to render basic education services with high sense of Respect, Transparency, and Ingenuity achieving customers' satisfaction and quality outputs in conformity with the existing policies and standards of the Department in pursuit of the goal <em>No Child Left Behind</em> and <em>Sulong Edukalidad</em>.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">SDO BATANGAS QUALITY POLICY</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  DepEd-Division of Batangas is one of the premier public educational institutions driven by competent workers who are dedicated to sustain high level performance.
                  We are committed to satisfy the demands of our clients through effective and efficient delivery of basic education services anchored on standardized processes and procedures with compliance to applicable laws and regulations.
                  QMS will be a way of life of the whole organization, thus determined for its continual improvement with the assurance that the Top Management will review and communicate all policies periodically as to appropriateness, practicality, suitability, and effectiveness.
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