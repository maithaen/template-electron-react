import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Home,
  Settings,
  Users,
  FileText,
  BarChart3,
  Mail,
  Calendar,
  HelpCircle,
  LucideIcon
} from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
}

interface MenuItem {
  icon: LucideIcon
  labelKey: string
  href: string
}

const MENU_ITEMS: MenuItem[] = [
  { icon: Home, labelKey: 'nav.dashboard', href: '/' },
  { icon: BarChart3, labelKey: 'nav.analytics', href: '/analytics' },
  { icon: Users, labelKey: 'nav.users', href: '/users' },
  { icon: FileText, labelKey: 'nav.documents', href: '/documents' },
  { icon: Mail, labelKey: 'nav.messages', href: '/messages' },
  { icon: Calendar, labelKey: 'nav.calendar', href: '/calendar' },
  { icon: Settings, labelKey: 'nav.settings', href: '/settings' },
  { icon: HelpCircle, labelKey: 'nav.help', href: '/help' }
]

function SidebarHeader({ isOpen }: { isOpen: boolean }): React.JSX.Element {
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        'flex items-center gap-3 py-6 transition-all duration-300',
        isOpen ? 'px-6' : 'px-2 justify-center'
      )}
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25 flex-shrink-0">
        <span className="text-white font-bold text-lg">E</span>
      </div>
      {isOpen && (
        <div className="overflow-hidden flex-1 animate-in fade-in slide-in-from-left-2 duration-300">
          <h1 className="text-slate-900 dark:text-white font-semibold text-lg whitespace-nowrap leading-tight">
            {t('app.name')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs whitespace-nowrap">
            {t('app.description')}
          </p>
        </div>
      )}
    </div>
  )
}

function SidebarUser({ isOpen }: { isOpen: boolean }): React.JSX.Element {
  if (!isOpen) {
    return (
      <div className="p-3 flex justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-slate-300 dark:hover:ring-white/20 transition-all shadow-sm">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={12}>
            John Doe
          </TooltipContent>
        </Tooltip>
      </div>
    )
  }

  return (
    <div className="p-4 border-t border-slate-100 dark:border-slate-800/50">
      <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer transition-colors group">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
          <span className="text-white font-semibold text-sm">JD</span>
        </div>
        <div className="overflow-hidden">
          <p className="text-slate-900 dark:text-white font-medium text-sm truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
            John Doe
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-xs truncate">john@example.com</p>
        </div>
      </div>
    </div>
  )
}

function SidebarItem({ item, isOpen }: { item: MenuItem; isOpen: boolean }): React.JSX.Element {
  const { t } = useTranslation()

  const Link = (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        cn(
          // Base layout & animation
          'flex items-center gap-3 rounded-xl transition-all duration-300 group relative overflow-hidden outline-none',
          // Interactive states
          !isActive &&
            'hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100 text-slate-600 dark:text-slate-400',
          // Active state
          isActive &&
            'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 font-medium',
          // Open vs Closed layout variants
          isOpen
            ? 'w-[calc(100%-16px)] mx-2 px-4 h-11'
            : 'w-12 h-12 pt-3 pl-5 justify-center mx-auto'
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-violet-600 dark:bg-violet-400 rounded-r-full hidden" />
          )}
          <item.icon
            className={cn(
              'w-5 h-5 flex-shrink-0 transition-transform duration-200',
              isOpen ? 'group-hover:scale-100' : 'group-hover:scale-110',
              isActive ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400'
            )}
          />
          {isOpen && (
            <span className="whitespace-nowrap flex-1 overflow-hidden text-ellipsis">
              {t(item.labelKey)}
            </span>
          )}
        </>
      )}
    </NavLink>
  )

  if (!isOpen) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{Link}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={12} className="font-medium">
          {t(item.labelKey)}
        </TooltipContent>
      </Tooltip>
    )
  }

  return Link
}

export function Sidebar({ isOpen }: SidebarProps): React.JSX.Element {
  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'h-full flex-shrink-0 relative z-20',
          'bg-white dark:bg-slate-900',
          'border-r border-slate-200 dark:border-slate-800',
          'transition-[width] duration-300 ease-in-out will-change-[width]',
          isOpen ? 'w-72' : 'w-20' // Increased widths slightly for better proportions
        )}
      >
        <div className="h-full flex flex-col w-full">
          <SidebarHeader isOpen={isOpen} />

          <div
            className={cn(
              'px-3 mb-2 transition-opacity duration-300',
              isOpen ? 'opacity-100' : 'opacity-0'
            )}
          ></div>

          <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto overflow-x-hidden py-2 custom-scrollbar">
            {MENU_ITEMS.map((item) => (
              <SidebarItem key={item.href} item={item} isOpen={isOpen} />
            ))}
          </nav>

          <SidebarUser isOpen={isOpen} />
        </div>
      </aside>
    </TooltipProvider>
  )
}
