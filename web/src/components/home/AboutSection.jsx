export default function AboutSection({ siteInfo }) {
  if (!siteInfo?.description) return null

  return (
    <section id="nosotros" className="featured-section">
      <div className="max-w-[1200px] mx-auto">
        <div className="section-head">
          <h2>Sobre Nosotros</h2>
        </div>
        <p className="about-text">
          {siteInfo.description}
        </p>
      </div>
    </section>
  )
}
