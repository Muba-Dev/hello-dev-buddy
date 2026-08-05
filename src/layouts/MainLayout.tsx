import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';

/**
 * MainLayout Component
 *
 * Editorial page frame: dateline banner, masthead, ruled content well, colophon.
 */
interface MainLayoutProps {
  children: React.ReactNode;
  /** Set true for pages that supply their own full-bleed ruled grid. */
  bleed?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, bleed = false }) => {
  return (
    <div className="min-h-screen bg-background p-3 md:p-6">
      <div className="max-w-7xl mx-auto border border-border bg-background flex flex-col min-h-[calc(100vh-1.5rem)] md:min-h-[calc(100vh-3rem)]">
        <Banner />
        <Header />
        <main className={bleed ? 'flex-1' : 'flex-1 px-6 py-10 md:px-16 md:py-16'}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
