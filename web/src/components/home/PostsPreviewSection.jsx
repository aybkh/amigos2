import { useState } from 'react'
import PostDrawer from '../ui/PostDrawer'
import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../lib/i18n'

const LOCALE_MAP = {
  es: 'es-ES', en: 'en-GB', cat: 'ca-ES', fr: 'fr-FR',
  de: 'de-DE', nl: 'nl-NL', ru: 'ru-RU', ar: 'ar-SA',
  pl: 'pl-PL', it: 'it-IT',
}

function formatDate(dateStr, lang) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString(LOCALE_MAP[lang] ?? 'es-ES', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function PostCard({ post, onOpen, lang }) {
  return (
    <article
      onClick={() => onOpen(post)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onOpen(post)}
      style={{
        background: 'rgba(245,240,232,0.04)',
        border: '1px solid rgba(245,240,232,0.08)',
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.2s, transform 0.15s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(0,230,118,0.30)'
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(245,240,232,0.08)'
        e.currentTarget.style.transform = 'none'
      }}
    >
      <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: 'rgba(0,230,118,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {post.cover_image_url ? (
          <img src={post.cover_image_url} alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <span style={{ fontSize: '3rem' }}>🍽️</span>
        )}
      </div>
      <div style={{ padding: '16px 20px 20px' }}>
        <p style={{
          fontFamily: 'Montserrat, sans-serif', fontSize: '0.74rem',
          color: 'rgba(245,240,232,0.38)', margin: '0 0 8px', letterSpacing: '0.04em',
        }}>
          {formatDate(post.published_at, lang)}
        </p>
        <h3 style={{
          fontFamily: "'Black Ops One', cursive", fontSize: '1.05rem',
          color: 'var(--color-cream)', letterSpacing: '0.04em', margin: '0 0 14px', lineHeight: 1.35,
        }}>
          {post.title}
        </h3>
        <span style={{
          fontFamily: 'Montserrat, sans-serif', fontSize: '0.78rem',
          fontWeight: 700, color: 'var(--color-neon)', letterSpacing: '0.06em',
        }}>
          {t(lang, 'ui.posts.read_more')}
        </span>
      </div>
    </article>
  )
}

function SkeletonCard() {
  return (
    <div style={{ background: 'rgba(245,240,232,0.03)', border: '1px solid rgba(245,240,232,0.06)', borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ aspectRatio: '16/9', background: 'rgba(245,240,232,0.04)' }} />
      <div style={{ padding: '16px 20px 20px' }}>
        <div style={{ height: 10, background: 'rgba(245,240,232,0.06)', borderRadius: 4, marginBottom: 10, width: '40%' }} />
        <div style={{ height: 16, background: 'rgba(245,240,232,0.08)', borderRadius: 4, marginBottom: 8 }} />
        <div style={{ height: 16, background: 'rgba(245,240,232,0.06)', borderRadius: 4, width: '70%' }} />
      </div>
    </div>
  )
}

export default function PostsPreviewSection({ posts, loading }) {
  const { lang } = useLanguage()
  const [openPost, setOpenPost] = useState(null)

  if (!loading && (!posts || posts.length === 0)) return null

  return (
    <section style={{ background: 'var(--color-bg-mid, #0a2a1a)', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 40 }}>
          <p style={{
            fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '0.72rem',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--color-neon)', margin: '0 0 10px',
          }}>
            {t(lang, 'ui.posts.subtitle')}
          </p>
          <h2 style={{
            fontFamily: "'Black Ops One', cursive",
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            color: 'var(--color-cream)', letterSpacing: '0.04em', margin: 0,
          }}>
            {t(lang, 'ui.posts.title')}
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : posts.map(post => <PostCard key={post.id} post={post} lang={lang} onOpen={setOpenPost} />)
          }
        </div>
      </div>

      {openPost && (
        <PostDrawer post={openPost} onClose={() => setOpenPost(null)} />
      )}
    </section>
  )
}
