import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/landing/LandingPage.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import PortalPage from "../pages/PortalPage.jsx";
import DepartmentsPage from "../pages/departments/DepartmentsPage.jsx";
import ProjectDetailPage from "../pages/projects/ProjectDetailPage.jsx";
import PostProjectPage from "../pages/student/PostProjectPage.jsx";
import EmptyState from "../components/common/EmptyState.jsx";

function NotFoundPage() {
  return (
    <main className="app-surface flex min-h-screen items-center justify-center px-4">
      <EmptyState title="Route not found" body="This prototype route is not defined yet." actionLabel="Go home" to="/" />
    </main>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/student" element={<PortalPage portalKey="student" />} />
      <Route path="/student/post-project" element={<PostProjectPage />} />
      <Route path="/student/projects" element={<PortalPage portalKey="student" />} />
      <Route path="/student/support-requests" element={<PortalPage portalKey="student" view="support" />} />

      <Route path="/teacher" element={<PortalPage portalKey="teacher" />} />
      <Route path="/teacher/reviews" element={<PortalPage portalKey="teacher" />} />
      <Route path="/teacher/mentorship" element={<PortalPage portalKey="teacher" />} />
      <Route path="/teacher/endorsed-projects" element={<PortalPage portalKey="teacher" />} />

      <Route path="/departments" element={<DepartmentsPage />} />
      <Route path="/departments/web" element={<PortalPage portalKey="web" />} />
      <Route path="/departments/embedded" element={<PortalPage portalKey="embedded" />} />
      <Route path="/departments/environment" element={<PortalPage portalKey="environment" />} />

      <Route path="/head-departments" element={<PortalPage portalKey="head" />} />

      <Route path="/secretary" element={<PortalPage portalKey="secretary" />} />
      <Route path="/secretary/announcements" element={<PortalPage portalKey="secretary" view="announcements" />} />
      <Route path="/secretary/reports" element={<PortalPage portalKey="secretary" view="announcements" />} />
      <Route path="/secretary/meetings" element={<PortalPage portalKey="secretary" view="announcements" />} />

      <Route path="/finance" element={<PortalPage portalKey="finance" />} />
      <Route path="/finance/requests" element={<PortalPage portalKey="finance" view="budget" />} />
      <Route path="/finance/materials" element={<PortalPage portalKey="finance" view="budget" />} />
      <Route path="/finance/partner-support" element={<PortalPage portalKey="finance" view="budget" />} />

      <Route path="/investor" element={<PortalPage portalKey="investor" />} />
      <Route path="/investor/projects" element={<PortalPage portalKey="investor" />} />
      <Route path="/investor/impact" element={<PortalPage portalKey="investor" />} />
      <Route path="/investor/support" element={<PortalPage portalKey="investor" />} />

      <Route path="/projects/:id" element={<ProjectDetailPage />} />
      <Route path="/post-project" element={<PostProjectPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
