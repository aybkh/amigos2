import { supabase } from './supabase'
import { TABLES } from '../lib/constants'

export const galleryService = {
  async getAll() {
    const { data, error } = await supabase
      .from(TABLES.GALLERY)
      .select('*')
      .order('display_order')
    if (error) throw error
    return data
  },

  async getPreview(limit = 6) {
    const { data, error } = await supabase
      .from(TABLES.GALLERY)
      .select('*')
      .order('display_order')
      .limit(limit)
    if (error) throw error
    return data
  },
}
