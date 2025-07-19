import {Route, Routes, useNavigate } from "react-router-dom";

import { ThemeProvider } from "./components/theme-provider";

// Pages
import HomePage from "./pages/HomePage";
import ExperiencesPage from "./pages/ExperiencesPage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AuthLayout from "./components/layout/AuthLayout";
import AppLayout from "./components/layout/AppLayout";
import CompaniesPage from "./pages/CompaniesPage";
import { useEffect } from "react";
import eventBus from "./lib/event-bus";
// import CompaniesPage from "./components/company/CompanySortBar";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = () => {
      const redirectUrl = window.location.pathname + window.location.search;
      const destination = `/login?message=session_expired&redirect=${encodeURIComponent(redirectUrl)}`;
      navigate(destination);
    };

    eventBus.addEventListener('unauthorized', handleUnauthorized);

    return () => {
      eventBus.removeEventListener('unauthorized', handleUnauthorized);
    };
  }, [navigate]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/experience" element={<ExperiencesPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
