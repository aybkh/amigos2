import { Link } from 'react-router-dom'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function PostCard({ post }) {
  return (
    <Link to={`/posts/${post.slug}`} className="featured-card-link">
      <div className="featured-card">
        <div className="card-image-container">
          {post.cover_image_url ? (
            <img src={post.cover_image_url} alt={post.title} loading="lazy" />
          ) : (
            <div className="card-image-placeholder">🍽️</div>
          )}
        </div>
        <div className="card-content">
          <p className="card-date">{formatDate(post.published_at)}</p>
          <h3>{post.title}</h3>
        </div>
      </div>
    </Link>
  )
}
