import { supabase } from './supabase'
import { TABLES, STORAGE } from '../lib/constants'

export const postsService = {
  async getAll() {
    const { data, error } = await supabase
      .from(TABLES.POSTS)
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async create(payload) {
    const { data, error } = await supabase.from(TABLES.POSTS).insert(payload).select().single()
    if (error) throw error
    return data
  },

  async update(id, payload) {
    const { data, error } = await supabase.from(TABLES.POSTS).update(payload).eq('id', id).select().single()
    if (error) throw error
    return data
  },

  async delete(id) {
    const { error } = await supabase.from(TABLES.POSTS).delete().eq('id', id)
    if (error) throw error
  },

  async publish(id) {
    return postsService.update(id, { is_published: true, published_at: new Date().toISOString() })
  },

  async unpublish(id) {
    return postsService.update(id, { is_published: false })
  },

  async uploadCoverImage(file) {
    const ext = file.name.split('.').pop()
    const path = `posts/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error: uploadError } = await supabase.storage.from(STORAGE.PUBLIC).upload(path, file)
    if (uploadError) throw uploadError
    const { data } = supabase.storage.from(STORAGE.PUBLIC).getPublicUrl(path)
    return data.publicUrl
  },
}
