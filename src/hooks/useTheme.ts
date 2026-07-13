import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) ?? 'system'
  })

  useEffect(() => {
    const root = document.documentElement
    const applyDark = () => root.classList.add('dark')
    const applyLight = () => root.classList.remove('dark')

    if (theme === 'dark') {
      applyDark()
    } else if (theme === 'light') {
      applyLight()
    } else {
      // system
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      mq.matches ? applyDark() : applyLight()

      const listener = (e: MediaQueryListEvent) =>
        e.matches ? applyDark() : applyLight()
      mq.addEventListener('change', listener)
      return () => mq.removeEventListener('change', listener)
    }
  }, [theme])

  const setAndPersist = (t: Theme) => {
    localStorage.setItem('theme', t)
    setTheme(t)
  }

  return { theme, setTheme: setAndPersist }
}
