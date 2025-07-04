import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeProviderState | undefined>(undefined)

/* ---------------------------------------------------------- */
/*  Provider                                                  */
/* ---------------------------------------------------------- */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null
    return stored ?? defaultTheme
  })

  /* ---------- core apply function ---------- */
  function applyTheme(target: Theme) {
    const root = document.documentElement
    root.classList.remove("light", "dark", "dark-pattern")

    const resolved =
      target === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : target

    root.classList.add(resolved)
    // add background pattern class only in dark mode
    if (resolved === "dark") root.classList.add("dark-pattern")
  }

  /* ---------- side‑effects ---------- */
  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  /* sync across tabs */
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        setThemeState(e.newValue as Theme)
      }
    }
    window.addEventListener("storage", handler)
    return () => window.removeEventListener("storage", handler)
  }, [storageKey])

  /* react to system changes when theme === "system" */
  useEffect(() => {
    if (theme !== "system") return
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const cb = () => applyTheme("system")
    mq.addEventListener("change", cb)
    return () => mq.removeEventListener("change", cb)
  }, [theme])

  /* ---------- exposed setter ---------- */
  const setTheme = (t: Theme) => setThemeState(t)

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/* ---------------------------------------------------------- */
/*  Hook                                                      */
/* ---------------------------------------------------------- */
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
