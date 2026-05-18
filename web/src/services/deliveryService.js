import { supabase } from './supabase'
import { TABLES } from '../lib/constants'

export const deliveryService = {
  // Solo enlaces activos y con URL, ordenados
  async getActive() {
    const { data, error } = await supabase
      .from(TABLES.DELIVERY_LINKS)
      .select('*')
      .eq('is_active', true)
      .order('display_order')
    if (error) throw error
    return (data ?? []).filter(l => l.url && l.url.trim() !== '')
  },
}
