import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageFallback from "@/components/PageFallback";

/**
 * Shared shell for every public route. Pages are rendered through `Outlet`,
 * so adding a page only requires adding a child route in App.tsx.
 */
const MainLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Banner />
    <Header />
    <main className="flex-1">
      <Suspense fallback={<PageFallback />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
  </div>
);

export default MainLayout;
