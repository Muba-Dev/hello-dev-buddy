import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/About";
import ProgramsPage from "./pages/Programs";
import SessionsPage from "./pages/Sessions";
import FeesPage from "./pages/Fees";
import AdmissionPage from "./pages/Admission";
import ContactPage from "./pages/Contact";
import FaqPage from "./pages/Faq";
import GalleryPage from "./pages/Gallery";
import Login from "./pages/Login";
import OAuthConsent from "./pages/OAuthConsent";

/**
 * Main application component
 *
 * Sets up React Query, UI providers and the public site routes.
 * Legacy /courses and /enrollment paths redirect to their new homes.
 */
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/sessions" element={<SessionsPage />} />
          <Route path="/fees" element={<FeesPage />} />
          <Route path="/admission" element={<AdmissionPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Legacy routes */}
          <Route path="/courses" element={<Navigate to="/programs" replace />} />
          <Route path="/enrollment" element={<Navigate to="/admission" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
