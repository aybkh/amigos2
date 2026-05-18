import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, UtensilsCrossed, Newspaper,
  Images, Info, LogOut, Menu, X, Mail, Bike,
} from 'lucide-react'
import { ROUTES } from '../../lib/constants'
import { useAuth } from '../../hooks/useAuth'
import { useUnreadCount } from '../../hooks/useUnreadCount'

const navItems = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: ROUTES.MENU, label: 'Carta', icon: UtensilsCrossed },
  { to: ROUTES.POSTS, label: 'Posts', icon: Newspaper },
  { to: ROUTES.GALLERY, label: 'Galería', icon: Images },
  { to: ROUTES.SITE_INFO, label: 'Info Restaurante', icon: Info },
  { to: ROUTES.DELIVERY, label: 'Pedir a domicilio', icon: Bike },
  { to: ROUTES.MESSAGES, label: 'Mensajes', icon: Mail, badge: true },
]

export default function AdminLayout({ children }) {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { count: unreadCount } = useUnreadCount()

  const handleLogout = async () => {
    await logout()
    navigate(ROUTES.LOGIN)
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-amber-50 text-amber-700'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-4 py-5 border-b border-gray-100 flex items-center gap-2">
        <img src="/amigos2-logo-1-1.png" alt="Amigos2" className="rounded-lg" style={{ height: 36, width: 36 }} />
        <span className="text-xs font-normal text-gray-400">Admin</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon, end, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <Icon size={18} />
            <span className="flex-1">{label}</span>
            {badge && unreadCount > 0 && (
              <span
                className="text-xs text-white font-semibold px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
                style={{ backgroundColor: '#C84B31' }}
              >
                {unreadCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 pb-4 border-t border-gray-100 pt-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 w-full text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-200 fixed inset-y-0">
        <SidebarContent />
      </aside>

      {/* Sidebar móvil — overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 bg-white flex flex-col shadow-xl z-50">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Contenido principal */}
      <div className="flex-1 md:ml-60 flex flex-col">
        {/* Header móvil */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600" aria-label="Abrir menú">
            <Menu size={22} />
          </button>
          <img src="/amigos2-logo-1-1.png" alt="Amigos2" className="rounded-lg" style={{ height: 32, width: 32 }} />
          {unreadCount > 0 && (
            <span
              className="ml-auto text-xs text-white font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: '#C84B31' }}
            >
              {unreadCount} mensaje{unreadCount !== 1 ? 's' : ''}
            </span>
          )}
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
