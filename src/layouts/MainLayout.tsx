
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';

/**
 * MainLayout Component
 * 
 * Provides a consistent layout structure for all pages with:
 * - Banner at the very top showing institution name and location
 * - Header navigation bar below the banner
 * - Main content area with proper spacing
 * - Footer at the bottom
 * 
 * This layout ensures consistent UI across all pages and devices.
 */
interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Banner />
      <Header />
      <main className="flex-1 container py-4 md:py-8 px-4 md:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
