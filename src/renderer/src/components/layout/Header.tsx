import { useTranslation } from 'react-i18next'
import { Moon, Sun, Bell, Search, Globe, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface HeaderProps {
  isDarkMode: boolean
  onThemeToggle: () => void
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'lo', name: 'ລາວ', flag: '🇱🇦' }
]

export function Header({ isDarkMode, onThemeToggle }: HeaderProps): React.JSX.Element {
  const { t, i18n } = useTranslation()

  const currentLang = languages.find((l) => l.code === i18n.resolvedLanguage) || languages[0]

  const changeLanguage = async (code: string): Promise<void> => {
    await i18n.changeLanguage(code)
    localStorage.setItem('language', code)
  }

  return (
    <TooltipProvider delayDuration={0}>
      <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700/50">
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Left section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl min-w-[280px]">
              <Search className="w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder={t('common.search')}
                className="bg-transparent border-none shadow-none h-auto p-0 text-sm text-slate-600 dark:text-slate-300 placeholder:text-slate-400 focus-visible:ring-0"
              />
              <Badge variant="secondary" className="hidden md:inline-flex text-xs font-normal">
                ⌘K
              </Badge>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Language dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  <span className="text-lg">{currentLang.flag}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={cn(
                      'gap-3 cursor-pointer',
                      i18n.resolvedLanguage === lang.code &&
                        'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400'
                    )}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-medium flex-1">{lang.name}</span>
                    {i18n.resolvedLanguage === lang.code && <Check className="w-4 h-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{t('common.notifications')}</TooltipContent>
            </Tooltip>

            {/* Theme toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onThemeToggle} className="group">
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-amber-500 group-hover:rotate-45 transition-transform duration-300" />
                  ) : (
                    <Moon className="w-5 h-5 text-slate-600 group-hover:-rotate-12 transition-transform duration-300" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isDarkMode ? t('common.lightMode') : t('common.darkMode')}
              </TooltipContent>
            </Tooltip>

            {/* User avatar */}
            <Button
              variant="ghost"
              className="hidden sm:flex items-center gap-3 pl-3 pr-1 py-1 h-auto"
            >
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">John Doe</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Admin</p>
              </div>
              <Avatar className="w-9 h-9">
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white font-semibold text-sm">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </header>
    </TooltipProvider>
  )
}
