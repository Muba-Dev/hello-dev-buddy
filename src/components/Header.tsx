import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { SCHOOL_NAME } from "@/data/school";

/**
 * Header Component
 *
 * Primary site navigation with the full public site map and a persistent
 * "Apply now" call to action. Highlights the active route.
 */
const navigationLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/programs", label: "Programs" },
  { path: "/sessions", label: "Timetable" },
  { path: "/fees", label: "Fees" },
  { path: "/gallery", label: "Gallery" },
  { path: "/faq", label: "FAQ" },
  { path: "/contact", label: "Contact" },
];

const Header: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-20">
      <div className="container flex items-center justify-between py-3 gap-4">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
            <img
              src="/lovable-uploads/8d885954-735f-4a6c-b8ad-3f47dd5cccd8.png"
              alt={`${SCHOOL_NAME} school crest`}
              className="w-full h-full object-contain"
              width={48}
              height={48}
            />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-serif text-lg">{SCHOOL_NAME}</span>
            <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Arabic &amp; Islamic Studies
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigationLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  aria-current={isActive(link.path) ? "page" : undefined}
                  className={`px-3 py-2 text-sm rounded-md transition-colors hover:text-primary ${
                    isActive(link.path) ? "text-primary font-medium" : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/admission">Apply now</Link>
          </Button>

          {/* Mobile navigation */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0">
                <nav aria-label="Mobile navigation" className="p-6 pt-12">
                  <ul className="grid gap-1">
                    {[...navigationLinks, { path: "/admission", label: "Admission" }].map((link) => (
                      <li key={link.path}>
                        <SheetClose asChild>
                          <Link
                            to={link.path}
                            className={`block py-3 px-3 rounded-md text-base ${
                              isActive(link.path) ? "bg-secondary font-medium" : "hover:bg-secondary/60"
                            }`}
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
