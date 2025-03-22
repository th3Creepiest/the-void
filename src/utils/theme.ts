export type Theme = "light" | "dark" | "system"

export function initializeTheme(): void {
  if (typeof window === "undefined") return

  const savedTheme = localStorage.getItem("theme") as Theme | null
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}

export function setTheme(theme: Theme): void {
  if (typeof window === "undefined") return

  localStorage.setItem("theme", theme)

  if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}
