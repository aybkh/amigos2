import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ROUTES } from './lib/constants'
import { LanguageProvider } from './hooks/useLanguage'
import { LegalModalContext } from './contexts/LegalModalContext'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import TvPage   from './pages/TvPage'
import CookieBanner from './components/ui/CookieBanner'
import LegalModal   from './components/ui/LegalModal'

function AppInner() {
  const location = useLocation()
  const [legalModal, setLegalModal] = useState(null)

  return (
    <LegalModalContext.Provider value={{ openLegal: setLegalModal }}>
      <Routes>
        <Route path={ROUTES.HOME}      element={<HomePage />} />
        <Route path={ROUTES.MENU}      element={<MenuPage />} />
        <Route path={ROUTES.TV}        element={<TvPage />} />
        <Route path={ROUTES.TV_LIGHT}  element={<TvPage forceTheme="light" />} />
        <Route path={ROUTES.TV_DARK}   element={<TvPage forceTheme="dark" />} />
        <Route path="*"                element={<HomePage />} />
      </Routes>

      {location.pathname === '/' && <CookieBanner />}

      {legalModal && (
        <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
      )}
    </LegalModalContext.Provider>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </LanguageProvider>
  )
}
