import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "./components/theme-provider";

// Pages
import HomePage from "./pages/HomePage";
import ExperiencesPage from "./pages/ExperiencesPage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AuthLayout from "./components/layout/AuthLayout";
import AppLayout from "./components/layout/AppLayout";
import CompaniesPage from "./pages/CompaniesPage";
// import CompaniesPage from "./components/company/CompanySortBar";

export default function App() {
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
