import { supabase } from './supabase'
import { TABLES } from '../lib/constants'

export const siteInfoService = {
  async get() {
    const { data, error } = await supabase
      .from(TABLES.SITE_INFO)
      .select('*')
      .single()
    if (error) throw error
    return data
  },

  async update(payload) {
    const { data: current } = await supabase.from(TABLES.SITE_INFO).select('id').single()
    const { data, error } = await supabase
      .from(TABLES.SITE_INFO)
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', current.id)
      .select()
      .single()
    if (error) throw error
    return data
  },
}
