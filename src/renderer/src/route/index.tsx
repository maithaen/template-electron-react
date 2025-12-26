import { RouteObject } from 'react-router-dom'
import {
  Dashboard,
  Analytics,
  Users,
  Documents,
  Messages,
  CalendarPage,
  Settings,
  Help
} from '../pages'

export const routes: RouteObject[] = [
  { path: '/', element: <Dashboard /> },
  { path: '/analytics', element: <Analytics /> },
  { path: '/users', element: <Users /> },
  { path: '/documents', element: <Documents /> },
  { path: '/messages', element: <Messages /> },
  { path: '/calendar', element: <CalendarPage /> },
  { path: '/settings', element: <Settings /> },
  { path: '/help', element: <Help /> }
]
