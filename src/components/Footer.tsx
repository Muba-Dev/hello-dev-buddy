
import React from 'react';
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

/**
 * Footer Component
 * 
 * Provides the site footer with:
 * - Brief description about the center
 * - Quick navigation links to main pages
 * - Contact information
 * - Social media links
 * - Copyright information
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-900 text-white py-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About the center section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Darul-Hudal Wal-Furquran</h3>
            <p className="text-emerald-100 mb-4">
              Islamic School and Center for learning Islamic knowledge, following the path 
              of our beloved Prophet Muhammad (SAW).
            </p>
            {/* Social media links */}
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-emerald-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-emerald-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-emerald-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick navigation links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-emerald-100 hover:text-white">Home</Link></li>
              <li><Link to="/courses" className="text-emerald-100 hover:text-white">Courses</Link></li>
              <li><Link to="/sessions" className="text-emerald-100 hover:text-white">Sessions</Link></li>
              <li><Link to="/fees" className="text-emerald-100 hover:text-white">School Fees</Link></li>
              <li><Link to="/enrollment" className="text-emerald-100 hover:text-white">Enrollment</Link></li>
            </ul>
          </div>
          
          {/* Contact information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-emerald-400" />
                <span>123 Islamic Center Road, City, Country</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-emerald-400" />
                <span>+1 234 567 8901</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-emerald-400" />
                <span>info@darulhudal.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright section */}
        <div className="border-t border-emerald-800 mt-8 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Darul-Hudal Wal-Furquran Islamic Center. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
