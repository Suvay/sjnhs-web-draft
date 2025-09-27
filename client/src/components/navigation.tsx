import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { 
  Menu, 
  X, 
  ChevronDown, 
  Home, 
  Calendar, 
  Users, 
  FileText, 
  MessageSquare, 
  Phone,
  Facebook,
  Twitter,
  Youtube
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { ThemeToggle } from "@/components/theme-toggle";
import { SchoolLogo } from "@/components/school-logo";

interface NavigationItem {
  label: string;
  path: string;
  icon?: any;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    label: "Home",
    path: "/",
    icon: Home
  },
  {
    label: "What's New!",
    path: "/whats-new",
    icon: MessageSquare,
    children: [
      { label: "Activities", path: "/activities" }
    ]
  },
  {
    label: "About Us",
    path: "/about",
    icon: Users,
    children: [
      { label: "School History", path: "/about/history" },
      { label: "Mission and Vision", path: "/about/mission-vision" },
      { label: "Citizens Charter", path: "/about/citizens-charter" },
      { label: "Organisational Chart", path: "/about/org-chart" },
      { label: "School Report Card for SY 2025–2026", path: "/about/report-card" }
    ]
  },
  {
    label: "Resources",
    path: "/resources",
    icon: FileText,
    children: [
      { label: "Issuances", path: "/resources/issuances" },
      { label: "Downloadable Forms", path: "/resources/forms" },
      { label: "Learning References", path: "/resources/learning" }
    ]
  },
  {
    label: "Updates",
    path: "/updates",
    icon: Calendar,
    children: [
      { label: "Calendar of Events", path: "/updates/calendar" },
      { label: "Announcements", path: "/updates/announcements" },
      { label: "Bulletin", path: "/updates/bulletin" },
      { label: "Videos", path: "/updates/videos" }
    ]
  },
  {
    label: "Contact Us",
    path: "/contact",
    icon: Phone
  }
];

export default function Navigation() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([]);

  const [location] = useLocation();



  const toggleSection = (path: string) => {
    setOpenSections(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };



  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const DesktopNavItem = ({ item }: { item: NavigationItem }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      const id = setTimeout(() => {
        setIsHovered(false);
      }, 150); // 150ms delay before closing
      setTimeoutId(id);
    };

    return (
      <div 
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={item.path}>
          <Button
            variant="ghost"
            className={`flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors ${
              isActive(item.path) ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' : ''
            }`}
          >
            <span>{item.label}</span>
            {item.children && <ChevronDown className="h-3 w-3" />}
          </Button>
        </Link>
        
        {/* Desktop Dropdown */}
        {item.children && isHovered && (
          <div 
            className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="py-2">
              {item.children?.map((child) => (
                <Link key={child.path} href={child.path}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      isActive(child.path) ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : ''
                    }`}
                    onClick={() => {
                      setIsHovered(false);
                      if (timeoutId) {
                        clearTimeout(timeoutId);
                      }
                    }}
                  >
                    {child.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const MobileNavItem = ({ item }: { item: NavigationItem }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openSections.includes(item.path);

    if (hasChildren) {
      return (
        <Collapsible open={isOpen} onOpenChange={() => toggleSection(item.path)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-between px-6 py-4 text-left text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                isActive(item.path) ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                {item.icon && <item.icon className="h-5 w-5" />}
                <span>{item.label}</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            {item.children?.map((child) => (
              <Link key={child.path} href={child.path}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start px-12 py-3 text-base text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    isActive(child.path) ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' : ''
                  }`}
                  onClick={closeMenu}
                >
                  {child.label}
                </Button>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <Link href={item.path}>
        <Button
          variant="ghost"
          className={`w-full justify-start px-6 py-4 text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
            isActive(item.path) ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' : ''
          }`}
          onClick={closeMenu}
        >
          <div className="flex items-center space-x-3">
            {item.icon && <item.icon className="h-5 w-5" />}
            <span>{item.label}</span>
          </div>
        </Button>
      </Link>
    );
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer">
                <SchoolLogo size="md" className="bg-white rounded-md p-1" />
                <h1 className="text-xl font-bold text-green-600 dark:text-green-400">
                  San Jose National High School
                </h1>
              </div>
            </Link>
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden lg:flex items-center">
            <ThemeToggle />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <DesktopNavItem key={item.path} item={item} />
            ))}
            <Button
              variant="outline"
              className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 font-medium ml-4 border-green-600 dark:border-green-400"
            >
              FAQ
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-full p-0 bg-white dark:bg-gray-900"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <SchoolLogo size="sm" className="bg-white rounded-md p-1" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <ThemeToggle />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </div>

              {/* Mobile FAQ Link */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  className="w-full text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                >
                  FAQ
                </Button>
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1 overflow-y-auto">
                <nav className="py-4">
                  {navigationItems.map((item) => (
                    <MobileNavItem key={item.path} item={item} />
                  ))}
                </nav>
              </div>

              {/* Mobile Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">


                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                  <Button size="sm" variant="outline" className="p-2">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2">
                    <Youtube className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}