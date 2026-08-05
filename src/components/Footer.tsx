import React from 'react';
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

/**
 * Footer Component
 *
 * Editorial colophon: contents index, contact register, and meta rule.
 */
const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-5 p-8 md:p-12 md:border-r border-border">
          <h3 className="font-display text-3xl mb-4">Darul-Hudal Wal-Furquran</h3>
          <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
            An Islamic school and centre for sacred learning, following the path of our beloved
            Prophet Muhammad (SAW).
          </p>
          <div className="flex gap-5 mt-8">
            <a href="#" aria-label="Facebook" className="hover:text-accent transition-colors"><Facebook size={18} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-accent transition-colors"><Instagram size={18} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-accent transition-colors"><Twitter size={18} /></a>
          </div>
        </div>

        <div className="md:col-span-3 p-8 md:p-12 md:border-r border-border">
          <p className="eyebrow mb-5">Contents</p>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li><Link to="/courses" className="hover:text-accent transition-colors">Courses</Link></li>
            <li><Link to="/sessions" className="hover:text-accent transition-colors">Sessions</Link></li>
            <li><Link to="/fees" className="hover:text-accent transition-colors">School Fees</Link></li>
            <li><Link to="/enrollment" className="hover:text-accent transition-colors">Enrollment</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4 p-8 md:p-12">
          <p className="eyebrow mb-5">Contact</p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
              <span>P.O. Box 295, Osogbo, Osun State, Nigeria</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-accent shrink-0" />
              <span>+234 800 000 0000</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-accent shrink-0" />
              <span>info@darulhudal.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border p-4 flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span>Osogbo, Nigeria</span>
        <span>&copy; {new Date().getFullYear()} Darul-Hudal Wal-Furquran. All rights reserved.</span>
        <span>Sacred Knowledge, Faithfully Taught</span>
      </div>
    </footer>
  );
};

export default Footer;
