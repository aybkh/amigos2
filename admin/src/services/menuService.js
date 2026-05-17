import { supabase } from './supabase'
import { TABLES, STORAGE } from '../lib/constants'

export const menuService = {
  async getCategories() {
    const { data, error } = await supabase
      .from(TABLES.CATEGORIES)
      .select(`*, products(*)`)
      .order('display_order')
    if (error) throw error
    return data
  },

  async createCategory(payload) {
    const { data, error } = await supabase.from(TABLES.CATEGORIES).insert(payload).select().single()
    if (error) throw error
    return data
  },

  async updateCategory(id, payload) {
    const { data, error } = await supabase.from(TABLES.CATEGORIES).update(payload).eq('id', id).select().single()
    if (error) throw error
    return data
  },

  async deleteCategory(id) {
    const { error } = await supabase.from(TABLES.CATEGORIES).delete().eq('id', id)
    if (error) throw error
  },

  async createProduct(payload) {
    const { data, error } = await supabase.from(TABLES.PRODUCTS).insert(payload).select().single()
    if (error) throw error
    return data
  },

  async updateProduct(id, payload) {
    const { data, error } = await supabase.from(TABLES.PRODUCTS).update(payload).eq('id', id).select().single()
    if (error) throw error
    return data
  },

  async deleteProduct(id) {
    const { error } = await supabase.from(TABLES.PRODUCTS).delete().eq('id', id)
    if (error) throw error
  },

  async uploadImage(file, folder = 'menu') {
    const ext = file.name.split('.').pop()
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error: uploadError } = await supabase.storage.from(STORAGE.PUBLIC).upload(path, file)
    if (uploadError) throw uploadError
    const { data } = supabase.storage.from(STORAGE.PUBLIC).getPublicUrl(path)
    return data.publicUrl
  },
}
