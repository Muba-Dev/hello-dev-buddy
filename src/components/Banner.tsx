import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { SCHOOL_FULL_NAME, SCHOOL_LOCATION, SCHOOL_PHONE } from '@/data/school';

/**
 * Banner Component
 *
 * Thin top strip with the institution's full name, physical location and phone.
 * Rendered on every page through MainLayout.
 */
const Banner: React.FC = () => {
  return (
    <div className="bg-foreground text-background py-2 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4 text-xs sm:text-[13px]">
        <div className="font-medium tracking-wide">{SCHOOL_FULL_NAME}</div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
          <span className="flex items-center gap-1.5">
            <MapPin size={13} aria-hidden="true" />
            {SCHOOL_LOCATION}
          </span>
          <a href={`tel:${SCHOOL_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:underline">
            <Phone size={13} aria-hidden="true" />
            {SCHOOL_PHONE}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
