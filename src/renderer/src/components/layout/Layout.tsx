import { useState, useEffect, ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      )
    }
    return false
  })

  // Auto-open sidebar on desktop, close on mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')

    const handleResize = (e: MediaQueryListEvent | MediaQueryList): void => {
      setSidebarOpen(e.matches)
    }

    // Set initial state
    handleResize(mediaQuery)

    // Listen for changes
    mediaQuery.addEventListener('change', handleResize)
    return () => mediaQuery.removeEventListener('change', handleResize)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleTheme = (): void => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleSidebar = (): void => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar with toggle button */}
      <div className="relative flex-shrink-0">
        <Sidebar isOpen={sidebarOpen} />

        {/* Toggle button on right border of sidebar */}
        <Button
          variant="outline"
          size="icon-sm"
          onClick={toggleSidebar}
          className={cn(
            'absolute top-1/2 -translate-y-1/2 z-40',
            'w-6 h-10 rounded-l-none rounded-r-md',
            'bg-white dark:bg-slate-800 border-l-0',
            'border-slate-200 dark:border-slate-700',
            'hover:bg-slate-100 dark:hover:bg-slate-700',
            'shadow-md transition-all duration-300',
            'right-0 translate-x-full'
          )}
        >
          {sidebarOpen ? (
            <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          )}
        </Button>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <Header isDarkMode={isDarkMode} onThemeToggle={toggleTheme} />

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
