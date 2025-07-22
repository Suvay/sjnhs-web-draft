import Navigation from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Facebook,
  Twitter,
  Youtube
} from "lucide-react";

export default function Contact() {
  const contactInfo = {
    address: "San Jose National High School, San Jose, Batangas, Philippines",
    phone: "(043) 726-1234",
    email: "info@sjnhs.edu.ph",
    officeHours: "Monday - Friday: 7:00 AM - 5:00 PM"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted");
    // Implement form submission logic
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get in touch with San Jose National High School
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Address</h3>
                      <p className="text-gray-600 dark:text-gray-300">{contactInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="text-green-600 dark:text-green-400 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
                      <p className="text-gray-600 dark:text-gray-300">{contactInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="text-yellow-600 dark:text-yellow-400 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300">{contactInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="text-purple-600 dark:text-purple-400 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Office Hours</h3>
                      <p className="text-gray-600 dark:text-gray-300">{contactInfo.officeHours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Embedded Map */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 dark:text-gray-400">Interactive Map</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">San Jose, Batangas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      <Facebook className="h-5 w-5 mr-2" />
                      Facebook
                    </Button>
                    <Button size="lg" variant="outline">
                      <Twitter className="h-5 w-5 mr-2" />
                      Twitter
                    </Button>
                    <Button size="lg" variant="outline">
                      <Youtube className="h-5 w-5 mr-2" />
                      YouTube
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white">
                    Send us a Message
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-300">
                    We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="Your first name"
                          required
                          className="bg-gray-50 dark:bg-gray-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Your last name"
                          required
                          className="bg-gray-50 dark:bg-gray-800"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        required
                        className="bg-gray-50 dark:bg-gray-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+63 XXX XXX XXXX"
                        className="bg-gray-50 dark:bg-gray-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        placeholder="What is this regarding?"
                        required
                        className="bg-gray-50 dark:bg-gray-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Your message here..."
                        rows={5}
                        required
                        className="bg-gray-50 dark:bg-gray-800"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    For Specific Inquiries
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Enrollment</span>
                      <Badge variant="outline">See Staff Directory</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Academic Affairs</span>
                      <Badge variant="outline">academic@sjnhs.edu.ph</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Student Affairs</span>
                      <Badge variant="outline">students@sjnhs.edu.ph</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}