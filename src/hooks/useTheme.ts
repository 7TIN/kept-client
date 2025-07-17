// src/hooks/useTheme.ts
import { ThemeContext, type ThemeProviderState } from "@/contexts/ThemeContext";
import { useContext } from "react";
// import { ThemeContext } from "@/components/theme-provider";
// import type { ThemeProviderState } from "@/components/theme-provider";

export function useTheme() {
  const context = useContext<ThemeProviderState | undefined>(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}