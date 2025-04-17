
import React from 'react';
import { MapPin } from 'lucide-react';

/**
 * Banner Component
 * 
 * Displays the educational institution's name and location prominently.
 * This banner appears on all pages through the MainLayout.
 * Utilizes flexbox for responsive layout across different device sizes.
 */
const Banner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white py-2 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
        <div className="font-semibold flex-shrink-0">Darul-Huda-Walfurquran</div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <MapPin size={14} />
          <span>Itaolokan area, Osogbo, Osun State</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
