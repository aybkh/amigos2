import { supabase } from './supabase'
import { TABLES } from '../lib/constants'

export const heroMediaService = {
  async get() {
    const { data, error } = await supabase
      .from(TABLES.HERO_MEDIA)
      .select('*')
      .limit(1)
      .maybeSingle()
    if (error) throw error
    return data
  },

  async upsert(payload) {
    const current = await this.get()
    if (current) {
      const { data, error } = await supabase
        .from(TABLES.HERO_MEDIA)
        .update(payload)
        .eq('id', current.id)
        .select()
        .single()
      if (error) throw error
      return data
    }
    const { data, error } = await supabase
      .from(TABLES.HERO_MEDIA)
      .insert({ ...payload, is_active: true })
      .select()
      .single()
    if (error) throw error
    return data
  },
}
