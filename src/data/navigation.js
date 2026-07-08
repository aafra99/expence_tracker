import {
  FiBarChart2,
  FiCpu,
  FiHome,
  FiPlusCircle,
  FiSettings,
  FiFileText,
} from 'react-icons/fi'

export const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: FiHome },
  { path: '/add', label: 'Add Transaction', icon: FiPlusCircle },
  { path: '/analytics', label: 'Analytics', icon: FiBarChart2 },
  { path: '/ai-insights', label: 'AI Insights', icon: FiCpu },
  { path: '/reports', label: 'Reports', icon: FiFileText },
  { path: '/settings', label: 'Settings', icon: FiSettings },
]

export const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/add': 'Add Transaction',
  '/analytics': 'Analytics',
  '/ai-insights': 'AI Insights',
  '/reports': 'Reports',
  '/settings': 'Settings',
}
