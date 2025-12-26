import { useState, useRef } from 'react'
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

interface SidebarProps {
  isOpen: boolean
}

interface MenuItem {
  icon: LucideIcon
  labelKey: string
  href: string
}

const menuItems: MenuItem[] = [
  { icon: Home, labelKey: 'nav.dashboard', href: '/' },
  { icon: BarChart3, labelKey: 'nav.analytics', href: '/analytics' },
  { icon: Users, labelKey: 'nav.users', href: '/users' },
  { icon: FileText, labelKey: 'nav.documents', href: '/documents' },
  { icon: Mail, labelKey: 'nav.messages', href: '/messages' },
  { icon: Calendar, labelKey: 'nav.calendar', href: '/calendar' },
  { icon: Settings, labelKey: 'nav.settings', href: '/settings' },
  { icon: HelpCircle, labelKey: 'nav.help', href: '/help' }
]

interface TooltipProps {
  text: string
  children: React.ReactNode
}

function Tooltip({ text, children }: TooltipProps): React.JSX.Element {
  const [show, setShow] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (): void => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({
        top: rect.top + rect.height / 2,
        left: rect.right + 8
      })
    }
    setShow(true)
  }

  return (
    <div
      ref={triggerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className="fixed z-[100] px-3 py-1.5 bg-slate-900 dark:bg-slate-700 text-white text-sm font-medium rounded-lg whitespace-nowrap shadow-lg -translate-y-1/2 pointer-events-none"
          style={{ top: position.top, left: position.left }}
        >
          {text}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900 dark:border-r-slate-700" />
        </div>
      )}
    </div>
  )
}

export function Sidebar({ isOpen }: SidebarProps): React.JSX.Element {
  const { t } = useTranslation()

  return (
    <aside
      className={`
        h-full flex-shrink-0
        bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-800
        border-r border-slate-200 dark:border-slate-700/50
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-16'}
      `}
    >
      <div
        className={`${isOpen ? 'w-64' : 'w-16'} h-full flex flex-col transition-all duration-300`}
      >
        {/* Logo */}
        <div
          className={`flex items-center gap-3 ${isOpen ? 'px-6' : 'px-3 justify-center'} py-5 border-b border-slate-200 dark:border-slate-700/50`}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25 flex-shrink-0">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          {isOpen && (
            <div className="overflow-hidden">
              <h1 className="text-slate-900 dark:text-white font-semibold text-lg whitespace-nowrap">
                {t('app.name')}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs whitespace-nowrap">
                {t('app.description')}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className={`flex-1 ${isOpen ? 'px-3' : 'px-2'} py-4 space-y-1 overflow-y-auto`}>
          {menuItems.map((item) =>
            isOpen ? (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl
                  text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white
                  hover:bg-slate-100 dark:hover:bg-white/10
                  transition-all duration-200
                  group
                  ${isActive ? 'bg-violet-50 dark:bg-white/10 text-violet-600 dark:text-white' : ''}
                `}
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                        isActive
                          ? 'text-violet-500 dark:text-violet-400'
                          : 'text-slate-400 group-hover:text-violet-500 dark:group-hover:text-violet-400'
                      }`}
                    />
                    <span className="font-medium whitespace-nowrap">{t(item.labelKey)}</span>
                  </>
                )}
              </NavLink>
            ) : (
              <Tooltip key={item.href} text={t(item.labelKey)}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) => `
                    flex items-center justify-center p-3 rounded-xl
                    text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white
                    hover:bg-slate-100 dark:hover:bg-white/10
                    transition-all duration-200
                    group
                    ${isActive ? 'bg-violet-50 dark:bg-white/10 text-violet-600 dark:text-white' : ''}
                  `}
                >
                  {({ isActive }) => (
                    <item.icon
                      className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                        isActive
                          ? 'text-violet-500 dark:text-violet-400'
                          : 'text-slate-400 group-hover:text-violet-500 dark:group-hover:text-violet-400'
                      }`}
                    />
                  )}
                </NavLink>
              </Tooltip>
            )
          )}
        </nav>

        {/* User section */}
        <div
          className={`p-4 border-t border-slate-200 dark:border-slate-700/50 ${!isOpen && 'flex justify-center'}`}
        >
          {isOpen ? (
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">JD</span>
              </div>
              <div className="overflow-hidden">
                <p className="text-slate-900 dark:text-white font-medium text-sm truncate">
                  John Doe
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs truncate">
                  john@example.com
                </p>
              </div>
            </div>
          ) : (
            <Tooltip text="John Doe">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-slate-300 dark:hover:ring-white/20 transition-all">
                <span className="text-white font-semibold text-sm">JD</span>
              </div>
            </Tooltip>
          )}
        </div>
      </div>
    </aside>
  )
}
