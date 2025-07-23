import { Facebook, Twitter, Youtube, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const quickLinks = [
    { label: "Home", id: "home" },
    { label: "Updates", id: "updates" },
    { label: "Enrollment", id: "enrollment" },
    { label: "Staff Directory", id: "staff" },
    { label: "Academic Calendar", id: "calendar" },
    { label: "School Policies", id: "policies" },
  ];

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">San Jose National High School</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Committed to providing quality education and fostering excellence in every student. 
              Join our community where students soar to new heights.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="text-blue-400 mt-1 h-4 w-4 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  San Jose National High School<br />
                  San Jose, Philippines
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="text-blue-400 h-4 w-4 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@sjnhs.edu.ph</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="text-blue-400 h-4 w-4 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Main Office: (XXX) XXX-XXXX</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 mb-2">
            © 2023 Team Secret Indonesia –{" "}
            <span className="text-blue-400 font-semibold">David Kiel M.</span>,{" "}
            <span className="text-blue-400 font-semibold">Geoff Tristan B.</span>,{" "}
            <span className="text-blue-400 font-semibold">Sophia Nicole G.</span>
          </p>
          <p className="text-gray-500 text-sm">24A Trolley Square #2164, Wilmington, DE 19806, USA</p>
          <p className="text-gray-400 mt-1">
            <span className="text-blue-400 font-semibold">It Lies Wihtin</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
