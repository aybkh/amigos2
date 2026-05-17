import { useSiteInfo } from '../../hooks/useSiteInfo'

export default function DeliverySection() {
    const { siteInfo } = useSiteInfo()

    const glovo    = siteInfo?.social_glovo
    const uberEats = siteInfo?.social_ubereats
    const phone    = siteInfo?.phone

    if (!glovo && !uberEats && !phone) return null

    return (
        <section id="delivery" className="delivery-section">
            <div className="max-w-[1200px] mx-auto">
                <div className="section-head mb-12">
                    <h2>Pide a Domicilio</h2>
                </div>

                <div className="delivery-container">
                    {glovo && (
                        <a href={glovo} target="_blank" rel="noopener noreferrer" className="delivery-card glovo">
                            <div className="delivery-logo-wrapper">
                                <img src="/images/glovo.webp" alt="Glovo" className="delivery-brand-logo" />
                            </div>
                            <div className="delivery-text-info">
                                <span className="delivery-btn-text">Pedir en Glovo</span>
                                <span className="delivery-note">Entrega en tu puerta</span>
                            </div>
                            <div className="delivery-arrow">➔</div>
                        </a>
                    )}

                    {uberEats && (
                        <a href={uberEats} target="_blank" rel="noopener noreferrer" className="delivery-card uber-eats">
                            <div className="delivery-logo-wrapper">
                                <img src="/images/ubereats.webp" alt="Uber Eats" className="delivery-brand-logo" />
                            </div>
                            <div className="delivery-text-info">
                                <span className="delivery-btn-text">Pedir en Uber Eats</span>
                                <span className="delivery-note">Entrega rápida</span>
                            </div>
                            <div className="delivery-arrow">➔</div>
                        </a>
                    )}

                    {phone && (
                        <a href={`tel:${phone.replace(/\s+/g, '')}`} className="delivery-card local">
                            <div className="delivery-logo-wrapper">
                                <span style={{ fontSize: '2rem' }}>📞</span>
                            </div>
                            <div className="delivery-text-info">
                                <span className="delivery-btn-text">Llamar al local</span>
                                <span className="delivery-note">{phone}</span>
                            </div>
                            <div className="delivery-arrow">➔</div>
                        </a>
                    )}
                </div>
            </div>
        </section>
    )
}
