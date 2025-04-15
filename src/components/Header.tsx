
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Home, School, CalendarDays, FileText } from "lucide-react";

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-emerald-800 text-white py-4 sticky top-0 z-10 backdrop-blur-sm bg-opacity-90">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-10 bg-emerald-600 text-white rounded-md flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <h1 className="text-xl font-semibold">Darul-Hudal Wal-Furquran</h1>
          </Link>
        </div>
        
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Button 
                variant="ghost" 
                className={`flex items-center gap-2 text-white hover:bg-emerald-700 ${location.pathname === '/' ? 'bg-emerald-700' : ''}`} 
                asChild
              >
                <Link to="/">
                  <Home size={16} />
                  <span>Home</span>
                </Link>
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                className={`flex items-center gap-2 text-white hover:bg-emerald-700 ${location.pathname === '/courses' ? 'bg-emerald-700' : ''}`} 
                asChild
              >
                <Link to="/courses">
                  <BookOpen size={16} />
                  <span>Courses</span>
                </Link>
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                className={`flex items-center gap-2 text-white hover:bg-emerald-700 ${location.pathname === '/sessions' ? 'bg-emerald-700' : ''}`} 
                asChild
              >
                <Link to="/sessions">
                  <CalendarDays size={16} />
                  <span>Sessions</span>
                </Link>
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                className={`flex items-center gap-2 text-white hover:bg-emerald-700 ${location.pathname === '/fees' ? 'bg-emerald-700' : ''}`} 
                asChild
              >
                <Link to="/fees">
                  <School size={16} />
                  <span>School Fees</span>
                </Link>
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                className={`flex items-center gap-2 text-white hover:bg-emerald-700 ${location.pathname === '/enrollment' ? 'bg-emerald-700' : ''}`} 
                asChild
              >
                <Link to="/enrollment">
                  <FileText size={16} />
                  <span>Enrollment</span>
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
