import { supabase } from './supabase'
import { TABLES, TV_CONFIG } from '../lib/constants'

export const menuService = {
  async getCategories() {
    try {
      const { data, error } = await supabase
        .from(TABLES.CATEGORIES)
        .select(`*, products(*)`)
        .eq('is_active', true)
        .order('display_order')
      if (error) throw error

      // Filter and sort products client-side (only available, ordered)
      const cleaned = (data ?? []).map(cat => ({
        ...cat,
        products: (cat.products ?? [])
          .filter(p => p.is_available)
          .sort((a, b) => a.display_order - b.display_order),
      }))

      try { localStorage.setItem(TV_CONFIG.MENU_CACHE_KEY, JSON.stringify(cleaned)) } catch {}
      return cleaned
    } catch (err) {
      try {
        const cached = localStorage.getItem(TV_CONFIG.MENU_CACHE_KEY)
        if (cached) return JSON.parse(cached)
      } catch {}
      throw err
    }
  },

  async getCategoryById(id) {
    const { data, error } = await supabase
      .from(TABLES.CATEGORIES)
      .select(`*, products(*)`)
      .eq('id', id)
      .single()
    if (error) throw error
    return {
      ...data,
      products: (data.products ?? [])
        .filter(p => p.is_available)
        .sort((a, b) => a.display_order - b.display_order),
    }
  },

  async getProductsByCategory(categoryId) {
    const { data, error } = await supabase
      .from(TABLES.PRODUCTS)
      .select('*')
      .eq('category_id', categoryId)
      .eq('is_available', true)
      .order('display_order')
    if (error) throw error
    return data
  },
}
