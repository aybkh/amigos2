import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from './lib/constants'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { ToastProvider } from './components/ui/Toast'
import { UnreadCountProvider } from './hooks/useUnreadCount'
import LoadingSpinner from './components/ui/LoadingSpinner'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import MenuPage from './pages/MenuPage'
import PostsPage from './pages/PostsPage'
import GalleryPage from './pages/GalleryPage'
import SiteInfoPage from './pages/SiteInfoPage'
import MessagesPage from './pages/MessagesPage'
import DeliveryPage from './pages/DeliveryPage'

function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()
  if (loading) return <LoadingSpinner fullScreen />
  if (!session) return <Navigate to={ROUTES.LOGIN} replace />
  return children
}

function AppRoutes() {
  const { session, loading } = useAuth()
  if (loading) return <LoadingSpinner fullScreen />

  return (
    <Routes>
      <Route
        path={ROUTES.LOGIN}
        element={session ? <Navigate to={ROUTES.DASHBOARD} replace /> : <LoginPage />}
      />
      <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path={ROUTES.MENU} element={<ProtectedRoute><MenuPage /></ProtectedRoute>} />
      <Route path={ROUTES.POSTS} element={<ProtectedRoute><PostsPage /></ProtectedRoute>} />
      <Route path={ROUTES.GALLERY} element={<ProtectedRoute><GalleryPage /></ProtectedRoute>} />
      <Route path={ROUTES.SITE_INFO} element={<ProtectedRoute><SiteInfoPage /></ProtectedRoute>} />
      <Route path={ROUTES.MESSAGES} element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
      <Route path={ROUTES.DELIVERY} element={<ProtectedRoute><DeliveryPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <UnreadCountProvider>
            <AppRoutes />
          </UnreadCountProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
