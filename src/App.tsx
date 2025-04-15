
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CoursesPage from "./pages/Courses";
import SessionsPage from "./pages/Sessions";
import FeesPage from "./pages/Fees";
import EnrollmentPage from "./pages/Enrollment";

/**
 * Main application component
 * 
 * Sets up:
 * 1. React Query for data fetching
 * 2. UI providers (Tooltip, Toast notifications)
 * 3. React Router for navigation between pages
 * 
 * The routing structure defines all available pages in the application.
 */

// Create React Query client for handling API requests and caching
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Toast notification systems */}
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main application routes */}
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/sessions" element={<SessionsPage />} />
          <Route path="/fees" element={<FeesPage />} />
          <Route path="/enrollment" element={<EnrollmentPage />} />
          {/* 404 page for handling unknown routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
