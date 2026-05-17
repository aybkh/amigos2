import { supabase } from './supabase'
import { TABLES } from '../lib/constants'

export const postsService = {
  async getRecent(limit = 3) {
    const { data, error } = await supabase
      .from(TABLES.POSTS)
      .select('id, title, slug, cover_image_url, published_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(limit)
    if (error) throw error
    return data
  },

  async getAll() {
    const { data, error } = await supabase
      .from(TABLES.POSTS)
      .select('id, title, slug, cover_image_url, published_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
    if (error) throw error
    return data
  },

  async getBySlug(slug) {
    const { data, error } = await supabase
      .from(TABLES.POSTS)
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()
    if (error) throw error
    return data
  },
}
