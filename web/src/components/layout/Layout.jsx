import Navbar from './Navbar'
import Footer from './Footer'
import { useSiteInfo } from '../../hooks/useSiteInfo'

export default function Layout({ children }) {
  const { siteInfo } = useSiteInfo()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer siteInfo={siteInfo} />
    </div>
  )
}
