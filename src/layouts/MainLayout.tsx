
import React from 'react';
import Header from '@/components/Header';

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
      <footer className="py-6 border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Dev Buddy © {new Date().getFullYear()} - Your development companion</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
