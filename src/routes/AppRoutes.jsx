import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScrollToTop from "../components/ScrollToTop";

// Lazy loaded pages
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Blog = lazy(() => import("../pages/Blog"));
const BlogDetail = lazy(() => import("../pages/BlogDetail"));
const Contact = lazy(() => import("../pages/Contact"));
const Services = lazy(() => import("../pages/Services"));
const ServiceDetails = lazy(() => import("../pages/ServiceDetails"));
const Donate = lazy(() => import("../pages/Donate"));
const Volunteer = lazy(() => import("../pages/Volunteer"));
const Gallery = lazy(() => import("../pages/Gallery"));
const FAQ = lazy(() => import("../pages/FAQ"));

// Admin Dashboards
const BlogAdminDashboard = lazy(() => import("../admin/AdminDashboard"));
const VolunteerAdminDashboard = lazy(() => import("../pages/AdminDashboard"));

// 404 Page
const NotFound = lazy(() => import("../pages/NotFound"));

export default function AppRoutes() {
   return (
      <Suspense
         fallback={
            <div className="h-screen flex items-center justify-center text-green-600 font-semibold">
               Loading...
            </div>
         }
      >
         <ScrollToTop />

         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetails />} />

            <Route path="/donate" element={<Donate />} />
            <Route path="/volunteer" element={<Volunteer />} />

            <Route path="/gallery" element={<Gallery />} />
            <Route path="/faq" element={<FAQ />} />

            {/* ADMIN DASHBOARDS */}
            <Route path="/admin/blog" element={<BlogAdminDashboard />} />
            <Route path="/admin/volunteer" element={<VolunteerAdminDashboard />} />

            {/* 404 ROUTE */}
            <Route path="*" element={<NotFound />} />
         </Routes>
      </Suspense>
   );
}