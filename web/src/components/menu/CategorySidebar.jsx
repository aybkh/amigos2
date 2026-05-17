import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../lib/i18n'
import CategoryGrid from './CategoryGrid'

export default function CategorySidebar({ categories, activeCatId, onSelect }) {
  const { lang } = useLanguage()
  return (
    <aside className="category-sidebar-desktop" aria-label={t(lang, 'ui.menu.categories')}>
      <CategoryGrid
        categories={categories}
        activeCatId={activeCatId}
        onSelect={onSelect}
        lang={lang}
      />
    </aside>
  )
}
