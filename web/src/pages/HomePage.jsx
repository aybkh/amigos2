import HeroSection          from '../components/home/HeroSection'
import StatsBar             from '../components/home/StatsBar'
import FeaturedSection      from '../components/home/FeaturedSection'
import PostsPreviewSection  from '../components/home/PostsPreviewSection'
import ReviewsSection       from '../components/landing/ReviewsSection'
import HoursSection         from '../components/home/HoursSection'
import DeliverySection      from '../components/home/DeliverySection'
import GallerySection       from '../components/home/GallerySection'
import LocationSection      from '../components/home/LocationSection'
import ContactSection       from '../components/home/ContactSection'
import Layout               from '../components/layout/Layout'
import { usePosts }         from '../hooks/usePosts'
import '../styles/LandingPage.css'

export default function HomePage() {
  const { posts, loading: postsLoading } = usePosts({ recent: true })

  return (
    <Layout>
      <HeroSection />
      <StatsBar />
      <FeaturedSection />
      <GallerySection />
      <DeliverySection />
      <HoursSection />
      <ReviewsSection />
      <LocationSection />
      <PostsPreviewSection posts={posts} loading={postsLoading} />
      <ContactSection />
    </Layout>
  )
}
