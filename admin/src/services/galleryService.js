import { supabase } from './supabase'
import { TABLES, STORAGE } from '../lib/constants'

export const galleryService = {
  async getAll() {
    const { data, error } = await supabase
      .from(TABLES.GALLERY)
      .select('*')
      .order('display_order')
    if (error) throw error
    return data
  },

  async upload(file) {
    const ext = file.name.split('.').pop()
    const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error: uploadError } = await supabase.storage.from(STORAGE.PUBLIC).upload(path, file)
    if (uploadError) throw uploadError
    const { data } = supabase.storage.from(STORAGE.PUBLIC).getPublicUrl(path)
    return data.publicUrl
  },

  async create(payload) {
    const { data, error } = await supabase.from(TABLES.GALLERY).insert(payload).select().single()
    if (error) throw error
    return data
  },

  async update(id, payload) {
    const { data, error } = await supabase.from(TABLES.GALLERY).update(payload).eq('id', id).select().single()
    if (error) throw error
    return data
  },

  async delete(id) {
    const { error } = await supabase.from(TABLES.GALLERY).delete().eq('id', id)
    if (error) throw error
  },
}
