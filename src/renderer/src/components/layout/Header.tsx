import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, Moon, Sun, Bell, Search, Globe, ChevronDown } from 'lucide-react'

interface HeaderProps {
  onMenuClick: () => void
  isDarkMode: boolean
  onThemeToggle: () => void
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'lo', name: 'ລາວ', flag: '🇱🇦' }
]

export function Header({ onMenuClick, isDarkMode, onThemeToggle }: HeaderProps): React.JSX.Element {
  const { t, i18n } = useTranslation()
  const [isLangOpen, setIsLangOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = languages.find((l) => l.code === i18n.resolvedLanguage) || languages[0]

  const changeLanguage = async (code: string): Promise<void> => {
    await i18n.changeLanguage(code)
    localStorage.setItem('language', code)
    setIsLangOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700/50">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>

          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t('common.search')}
              className="bg-transparent border-none outline-none text-sm text-slate-600 dark:text-slate-300 placeholder:text-slate-400 w-full"
            />
            <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-slate-400 bg-slate-200 dark:bg-slate-700 rounded">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Language dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Globe className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {currentLang.flag}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown menu */}
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                      i18n.resolvedLanguage === lang.code
                        ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="relative p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
          </button>

          {/* Theme toggle */}
          <button
            onClick={onThemeToggle}
            className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-amber-500 group-hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600 group-hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>

          {/* User avatar */}
          <button className="hidden sm:flex items-center gap-3 pl-3 pr-1 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">John Doe</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Admin</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
