import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Play } from "lucide-react";

export default function LearningModality() {
  const features = [
    {
      title: "Flexible Learning",
      description: "Students can learn at their own pace with structured modules"
    },
    {
      title: "Quality Materials",
      description: "Comprehensive printed modules designed by our expert teachers"
    },
    {
      title: "Teacher Support",
      description: "Regular communication and guidance from dedicated educators"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Learning Delivery Modality
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              School opening will not necessarily mean traditional face-to-face learning in the classroom. 
              This refers to a learning delivery modality where learning takes place between the teacher 
              and the learners who are geographically remote from each other during instruction.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Our modular (print) distance learning approach ensures quality education reaches every student, 
              regardless of their location or circumstances.
            </p>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="text-blue-600 h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Distance+Learning"
              alt="Students engaged in distance learning with study materials"
              className="rounded-xl shadow-xl w-full h-auto"
            />
            
            {/* Video Placeholder */}
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl flex items-center justify-center">
              <Button
                size="icon"
                className="w-16 h-16 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
                onClick={() => console.log("Play educational video about modular learning")}
              >
                <Play className="text-blue-600 h-6 w-6 ml-1" />
              </Button>
            </div>
            
            <Card className="absolute bottom-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm">
              <div className="p-3">
                <p className="text-sm font-semibold text-gray-800">Watch: Modular Distance Learning</p>
                <p className="text-xs text-gray-600">Learn about our learning delivery approach</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
