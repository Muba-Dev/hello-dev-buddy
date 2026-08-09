import React from 'react';
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import {
  SCHOOL_NAME,
  SCHOOL_LOCATION,
  SCHOOL_PHONE,
  SCHOOL_EMAIL,
  FOUNDED_YEAR,
} from "@/data/school";

/**
 * Footer Component
 *
 * Site-wide footer: short positioning statement, full navigation,
 * contact details and copyright.
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-foreground border-t border-border mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h2 className="font-serif text-xl mb-3">{SCHOOL_NAME}</h2>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Teaching Qur'an, Arabic and Islamic studies in Osogbo since {FOUNDED_YEAR}.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="p-2 rounded-md hover:bg-background transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="p-2 rounded-md hover:bg-background transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-4">Explore</h2>
            <ul className="grid grid-cols-2 gap-y-2 text-sm">
              {[
                { to: "/about", label: "About" },
                { to: "/programs", label: "Programs" },
                { to: "/sessions", label: "Timetable" },
                { to: "/fees", label: "Fees" },
                { to: "/admission", label: "Admission" },
                { to: "/gallery", label: "Gallery" },
                { to: "/faq", label: "FAQ" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted-foreground hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>{SCHOOL_LOCATION}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} aria-hidden="true" />
                <a href={`tel:${SCHOOL_PHONE.replace(/\s/g, '')}`} className="hover:text-primary">{SCHOOL_PHONE}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} aria-hidden="true" />
                <a href={`mailto:${SCHOOL_EMAIL}`} className="hover:text-primary">{SCHOOL_EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} {SCHOOL_NAME}. All rights reserved.</p>
          <p>Osogbo, Osun State, Nigeria</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
