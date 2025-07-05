import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "./components/theme-provider";


// Pages
import HomePage from "./pages/HomePage";
import ExperiencesPage from "./pages/ExperiencesPage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AuthLayout from "./components/layout/AuthLayout";
import AppLayout from "./components/layout/AppLayout";
import CompaniesPage from "./components/company/CompanySortBar";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

        <Routes>
          {/* ───── Auth Routes (no navbar, no background) ───── */}
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <Signup />
              </AuthLayout>
            }
          />


          <Route
            path="/companies"
            element={
              <AppLayout>
                <CompaniesPage />
              </AppLayout>
            }
          />
          {/* ───── Main App Routes (with navbar and background) ───── */}
          <Route
            path="/"
            element={
              <AppLayout>
                <HomePage />
              </AppLayout>
            }
          />
          <Route
            path="/experience"
            element={
              <AppLayout>
                <ExperiencesPage />
              </AppLayout>
            }
          />
        </Routes>
    </ThemeProvider>
  );
}
