import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Reviews from "./pages/Reviews";
import LeaveReview from "./pages/LeaveReview";
import FAQ from "./pages/FAQ";
import Packages from "./pages/Packages";
import Contact from "./pages/Contact";

import RequireAuth from "./components/admin/RequireAuth";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminContacts from "./pages/admin/AdminContacts";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/leave-review" element={<LeaveReview />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin/dashboard" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
      <Route path="/admin/projects" element={<RequireAuth><AdminProjects /></RequireAuth>} />
      <Route path="/admin/reviews" element={<RequireAuth><AdminReviews /></RequireAuth>} />
      <Route path="/admin/contacts" element={<RequireAuth><AdminContacts /></RequireAuth>} />
    </Routes>
  );
}
