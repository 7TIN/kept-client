// import { useEffect, useState } from 'react'
// import { LoginForm } from './components/login-form'

// import { LoginForm } from "@/components/login-form"

import { Navbar } from "./components/layout/Navbar"
import { ThemeProvider } from "./components/theme-provider"
import ExperiencesPage from "./pages/ExperiencesPage"
import Login from "./pages/login"
import Signup from "./pages/signup"
import { BrowserRouter, Route, Routes } from "react-router-dom"


function App() {

  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* Navigation bar visible on all pages */}
        <Navbar />

        {/* App routes */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/experience" element={<ExperiencesPage />} />
          {/* Optional default/home route */}
          <Route path="/" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
    
  )
}

export default App
