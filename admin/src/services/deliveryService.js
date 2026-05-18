import { supabase } from './supabase'
import { TABLES } from '../lib/constants'

export const deliveryService = {
  async list() {
    const { data, error } = await supabase
      .from(TABLES.DELIVERY_LINKS)
      .select('*')
      .order('display_order')
    if (error) throw error
    return data ?? []
  },

  async update(id, fields) {
    const { data, error } = await supabase
      .from(TABLES.DELIVERY_LINKS)
      .update(fields)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },
}
