import React from 'react';
import { MapPin } from 'lucide-react';

/**
 * Banner Component
 *
 * Slim editorial dateline strip above the masthead.
 */
const Banner: React.FC = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 text-[10px] uppercase tracking-[0.2em]">
        <div className="font-semibold">Darul-Huda-Walfurquran &middot; School of Arabic and Islamic Studies</div>
        <div className="flex items-center gap-1.5">
          <MapPin size={12} />
          <span>P.O. Box 295, Osogbo, Osun State, Nigeria</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
