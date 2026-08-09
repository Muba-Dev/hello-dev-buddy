
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Home, School, CalendarDays, FileText, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

/**
 * Header Component
 * 
 * Provides the main navigation bar for the application with links to all major sections.
 * Uses React Router for navigation and highlights the active route.
 * Implements responsive design for mobile and desktop screens.
 */
const Header: React.FC = () => {
  const location = useLocation();
  
  const navigationLinks = [
    {
      path: "/",
      label: "Home",
      icon: <Home size={16} />
    },
    {
      path: "/courses",
      label: "Courses",
      icon: <BookOpen size={16} />
    },
    {
      path: "/sessions",
      label: "Sessions",
      icon: <CalendarDays size={16} />
    },
    {
      path: "/fees",
      label: "School Fees",
      icon: <School size={16} />
    },
    {
      path: "/enrollment",
      label: "Enrollment",
      icon: <FileText size={16} />
    }
  ];

  return (
    <header className="bg-emerald-800 text-white py-4 sticky top-0 z-10 backdrop-blur-sm bg-opacity-90">
      <div className="container flex items-center justify-between">
        {/* Logo and Site Title */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-white">
              <img 
                src="/lovable-uploads/8d885954-735f-4a6c-b8ad-3f47dd5cccd8.png" 
                alt="Darul-Huda-Walfurquran Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <h1 className="text-xl font-semibold">Darul-Hudal Wal-Furquran</h1>
              <p className="text-xs text-emerald-200">School of Arabic and Islamic Studies</p>
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-4">
            {navigationLinks.map((link) => (
              <li key={link.path}>
                <Button 
                  variant="ghost" 
                  className={`flex items-center gap-2 text-white hover:bg-emerald-700 ${location.pathname === link.path ? 'bg-emerald-700' : ''}`} 
                  asChild
                >
                  <Link to={link.path}>
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-emerald-800 text-white p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 flex justify-between items-center border-b border-emerald-700">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white">
                      <img 
                        src="/lovable-uploads/8d885954-735f-4a6c-b8ad-3f47dd5cccd8.png" 
                        alt="Darul-Huda-Walfurquran Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h2 className="font-semibold text-lg">Menu</h2>
                  </div>
                </div>
                <nav className="flex-1 p-4">
                  <ul className="grid gap-3">
                    {navigationLinks.map((link) => (
                      <li key={link.path}>
                        <Link 
                          to={link.path} 
                          className={`flex items-center gap-3 py-3 px-4 rounded-md ${
                            location.pathname === link.path ? 'bg-emerald-700' : 'hover:bg-emerald-700/50'
                          }`}
                        >
                          {link.icon}
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
