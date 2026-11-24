import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageFallback from "@/components/PageFallback";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

const Index = lazy(() => import("./pages/Index"));
const AboutPage = lazy(() => import("./pages/About"));
const ProgramsPage = lazy(() => import("./pages/Programs"));
const SessionsPage = lazy(() => import("./pages/Sessions"));
const FeesPage = lazy(() => import("./pages/Fees"));
const AdmissionPage = lazy(() => import("./pages/Admission"));
const GalleryPage = lazy(() => import("./pages/Gallery"));
const FaqPage = lazy(() => import("./pages/Faq"));
const ContactPage = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const OAuthConsent = lazy(() => import("./pages/OAuthConsent"));
const AdminRoute = lazy(() => import("./components/AdminRoute"));
const AdminAdmissions = lazy(() => import("./pages/admin/Admissions"));

const App = () => (
  <TooltipProvider>
    <Toaster />
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          {/* Public site — MainLayout owns the banner, header, footer and suspense boundary. */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/fees" element={<FeesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admission" element={<AdmissionPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Legacy routes */}
          <Route path="/courses" element={<Navigate to="/programs" replace />} />
          <Route path="/enrollment" element={<Navigate to="/admission" replace />} />

          {/* Auth surfaces intentionally render without the public site shell. */}
          <Route path="/login" element={<Login />} />
          <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />

          {/* Staff area — guarded by session + admin allowlist. */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/admissions" element={<AdminAdmissions />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
