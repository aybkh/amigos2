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
}
