import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://files.kick.com/images/channel/22563539/banner_image/d4da1849-663e-4a32-a86b-755ec5f98d1e")'
        }}
      />
      
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="backdrop-blur-sm rounded-2xl p-8 lg:p-12">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              SOAR HIGH!<br />
              <span className="text-blue-300 drop-shadow-lg">San Jose High!</span>
            </h1>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed drop-shadow-md">
              Welcome to our school's page! We encourage excellence, foster growth, and prepare students for a bright future through quality education and strong community values.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection("enrollment")}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                size="lg"
              >
                Enroll Now
              </Button>
              <Button
                onClick={() => scrollToSection("updates")}
                variant="outline"
                className="border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors shadow-lg backdrop-blur-sm"
                size="lg"
              >
                Latest Updates
              </Button>
            </div>
          </div>
          <div className="relative lg:block hidden">
            {/* This space can be used for additional content or left empty for better focus on the main text */}
            <div className="backdrop-blur-sm rounded-xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">Experience Excellence</h3>
              <p className="text-gray-100 drop-shadow-sm">
                Join our community of learners and discover your potential in a supportive, innovative environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
