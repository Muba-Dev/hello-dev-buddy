
import React from 'react';
import { MapPin } from 'lucide-react';

/**
 * Banner Component
 * 
 * Displays the educational institution's name and location prominently.
 * This banner appears on all pages through the MainLayout.
 */
const Banner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white py-2 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
        <div className="font-semibold">Darul-Huda-Walfurquran</div>
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span>Itaolokan area, Osogbo, Osun State</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
