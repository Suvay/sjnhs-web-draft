import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone } from "lucide-react";

export default function Staff() {
  const staffMembers = [
    {
      name: "Ms. Precious V. Roman",
      grade: "Grade 7",
      contact: "0926-923-2132",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    },
    {
      name: "Ms. Angelica C. Rapay",
      grade: "Grade 8",
      contact: "0929-779-0940",
      photo: "https://images.unsplash.com/photo-1494790108755-2616c98d7531?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    },
    {
      name: "Mr. Dario M. Manata",
      grade: "Grade 9",
      contact: "0907-074-1893",
      photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    },
    {
      name: "Mrs. Rizalyn B. Balinado",
      grade: "Grade 10",
      contact: "0999-971-5315",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    },
  ];

  return (
    <section id="staff" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet Our Staff</h2>
          <p className="text-xl text-gray-600">Contact our dedicated enrollment personnel for assistance</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {staffMembers.map((member) => (
            <Card key={member.name} className="shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
              <img
                src={member.photo}
                alt={`${member.name} - ${member.grade} Personnel`}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <div className="flex items-center mb-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {member.grade}
                  </Badge>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Phone className="mr-2 h-4 w-4" />
                  <span className="font-mono">{member.contact}</span>
                </div>
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <a href={`tel:${member.contact.replace(/-/g, '')}`}>
                    Call Now
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
