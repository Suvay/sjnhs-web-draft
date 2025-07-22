import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="school-gradient text-white hero-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              SOAR HIGH!<br />
              <span className="text-yellow-300">San Jose High!</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Welcome to our school's page! We encourage excellence, foster growth, and prepare students for a bright future through quality education and strong community values.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection("enrollment")}
                className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                size="lg"
              >
                Enroll Now
              </Button>
              <Button
                onClick={() => scrollToSection("updates")}
                variant="outline"
                className="border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors"
                size="lg"
              >
                Latest Updates
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://via.placeholder.com/800x600/1E40AF/FFFFFF?text=School+Building"
              alt="Modern school building exterior"
              className="rounded-xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
