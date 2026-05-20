import { supabase } from './supabase'
import { TABLES } from '../lib/constants'

export const heroMediaService = {
  // Devuelve el media activo o null si no hay o falla (tabla puede no existir aún)
  async getActive() {
    try {
      const { data, error } = await supabase
        .from(TABLES.HERO_MEDIA)
        .select('*')
        .eq('is_active', true)
        .limit(1)
        .maybeSingle()
      if (error) return null
      return data || null
    } catch {
      return null
    }
  },
}
