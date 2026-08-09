import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import {
  SCHOOL_FULL_NAME,
  SCHOOL_LOCATION,
  SCHOOL_PHONE,
  SCHOOL_EMAIL,
} from '@/data/school';

const ContactPage = () => (
  <MainLayout>
    <div className="container py-16 max-w-4xl">
      <p className="eyebrow mb-3">Contact</p>
      <h1 className="text-4xl md:text-5xl mb-4">Visit, call or write to us</h1>
      <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
        The school office is open on weekdays. Walk in for a tour or call ahead and we will set a
        time.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="border border-border rounded-md p-6 bg-card">
          <h2 className="font-serif text-2xl mb-4">{SCHOOL_FULL_NAME}</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
              <span>{SCHOOL_LOCATION}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="text-primary shrink-0" aria-hidden="true" />
              <a href={`tel:${SCHOOL_PHONE.replace(/\s/g, '')}`} className="hover:text-primary">
                {SCHOOL_PHONE}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="text-primary shrink-0" aria-hidden="true" />
              <a href={`mailto:${SCHOOL_EMAIL}`} className="hover:text-primary">
                {SCHOOL_EMAIL}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock size={18} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
              <span>Office hours: Monday to Friday, 9:00 AM - 4:00 PM</span>
            </li>
          </ul>
        </div>

        <div className="border border-border rounded-md p-6 bg-secondary/50">
          <h2 className="font-serif text-2xl mb-3">Applying?</h2>
          <p className="text-sm text-muted-foreground mb-5">
            The fastest way to start is the admission form. It takes about five minutes and we
            call you back within three working days.
          </p>
          <Button asChild>
            <Link to="/admission">Open the admission form</Link>
          </Button>
        </div>
      </div>
    </div>
  </MainLayout>
);

export default ContactPage;
