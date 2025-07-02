// import { useEffect, useState } from 'react'
// import { LoginForm } from './components/login-form'

// import { LoginForm } from "@/components/login-form"

import { ThemeProvider } from "./components/theme-provider"
import ExperiencesPage from "./pages/ExperiencesPage"
import Login from "./pages/login"
import Signup from "./pages/signup"
import { Route, Routes } from "react-router-dom"


function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="#"/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/experience" element={<ExperiencesPage/>} />
      </Routes>
    </ThemeProvider>
    
  )
}

export default App
