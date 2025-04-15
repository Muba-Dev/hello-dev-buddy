
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * MainLayout Component
 * 
 * Provides a consistent layout structure for all pages with:
 * - Header navigation bar at the top
 * - Main content area with proper spacing
 * - Footer at the bottom
 * 
 * This layout ensures consistent UI across all pages.
 */
interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
