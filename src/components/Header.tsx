import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

/**
 * Header Component
 *
 * Magazine masthead: title block, centered rule-divided nav, session dateline.
 */
const navigationLinks = [
  { path: "/", label: "Home" },
  { path: "/courses", label: "Courses" },
  { path: "/sessions", label: "Sessions" },
  { path: "/fees", label: "School Fees" },
  { path: "/enrollment", label: "Enrollment" },
];

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="border-b border-border bg-background sticky top-0 z-20">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Title block */}
        <div className="md:col-span-3 md:border-r border-border p-5 flex items-center justify-between md:justify-start gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-secondary flex items-center justify-center shrink-0">
              <img
                src="/lovable-uploads/8d885954-735f-4a6c-b8ad-3f47dd5cccd8.png"
                alt="Darul-Hudal Wal-Furquran crest"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-display text-2xl leading-[0.95]">
              Darul-Hudal
              <br />
              Wal-Furquran
            </span>
          </Link>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu size={22} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background p-0 border-l border-border">
                <div className="p-6 border-b border-border">
                  <p className="eyebrow">Contents</p>
                </div>
                <nav className="p-2">
                  <ul>
                    {navigationLinks.map((link) => (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className={`block px-4 py-4 text-sm uppercase tracking-widest border-b border-border ${
                            location.pathname === link.path ? 'bg-secondary font-semibold' : ''
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex md:col-span-6 md:border-r border-border p-5 items-center justify-center">
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-[11px] uppercase tracking-widest font-medium">
            {navigationLinks.map((link) => {
              const active = location.pathname === link.path;
              const enroll = link.path === '/enrollment';
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={
                      enroll
                        ? 'px-3 py-1 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors'
                        : `transition-colors hover:text-accent ${active ? 'underline underline-offset-8 decoration-accent' : ''}`
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Dateline */}
        <div className="hidden md:flex md:col-span-3 p-5 flex-col justify-center text-right">
          <span className="eyebrow">Current Session</span>
          <span className="font-display text-xl italic">{new Date().getFullYear()} / {new Date().getFullYear() + 1}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
