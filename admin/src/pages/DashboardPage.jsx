import { Link } from 'react-router-dom'
import AdminLayout from '../components/layout/AdminLayout'
import { UtensilsCrossed, Newspaper, Images, Info, Mail } from 'lucide-react'
import { ROUTES } from '../lib/constants'
import { useUnreadCount } from '../hooks/useUnreadCount'

export default function DashboardPage() {
  const { count: unreadCount } = useUnreadCount()

  const sections = [
    { to: ROUTES.MENU, label: 'Carta Digital', description: 'Gestiona categorías y productos', icon: UtensilsCrossed, color: 'amber' },
    { to: ROUTES.POSTS, label: 'Posts', description: 'Noticias y promociones', icon: Newspaper, color: 'blue' },
    { to: ROUTES.GALLERY, label: 'Galería', description: 'Sube y organiza fotos', icon: Images, color: 'green' },
    { to: ROUTES.SITE_INFO, label: 'Info Restaurante', description: 'Horario, dirección, redes sociales', icon: Info, color: 'purple' },
  ]

  const colorMap = {
    amber: 'bg-amber-50 text-amber-700',
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    purple: 'bg-purple-50 text-purple-700',
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Bienvenido al panel</h1>
        <p className="text-gray-500 text-sm mb-8">¿Qué quieres gestionar hoy?</p>

        {/* Card de mensajes nuevos — destacada si hay no leídos */}
        {unreadCount > 0 && (
          <Link
            to={ROUTES.MESSAGES}
            className="flex items-center gap-4 p-5 rounded-2xl border mb-6 transition-shadow hover:shadow-md group"
            style={{ backgroundColor: '#fff8f7', borderColor: '#C84B31' }}
          >
            <div className="p-3 rounded-xl text-white" style={{ backgroundColor: '#C84B31' }}>
              <Mail size={22} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 group-hover:text-red-700 transition-colors">
                {unreadCount} mensaje{unreadCount !== 1 ? 's' : ''} nuevo{unreadCount !== 1 ? 's' : ''}
              </p>
              <p className="text-sm text-gray-500 mt-0.5">Ver mensajes del formulario de contacto</p>
            </div>
            <span className="text-sm text-gray-400 group-hover:text-gray-600">→</span>
          </Link>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sections.map(({ to, label, description, icon: Icon, color }) => (
            <Link
              key={to}
              to={to}
              className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-200 hover:shadow-md transition-shadow group"
            >
              <div className={`p-3 rounded-xl ${colorMap[color]}`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 group-hover:text-amber-700 transition-colors">{label}</p>
                <p className="text-sm text-gray-500 mt-0.5">{description}</p>
              </div>
            </Link>
          ))}

          {/* Card Mensajes — siempre visible en el grid */}
          <Link
            to={ROUTES.MESSAGES}
            className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-200 hover:shadow-md transition-shadow group"
          >
            <div className="p-3 rounded-xl bg-gray-50 text-gray-600">
              <Mail size={22} />
            </div>
            <div>
              <p className="font-semibold text-gray-800 group-hover:text-amber-700 transition-colors">Mensajes</p>
              <p className="text-sm text-gray-500 mt-0.5">
                {unreadCount > 0
                  ? `${unreadCount} sin leer`
                  : 'Formulario de contacto'}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  )
}
