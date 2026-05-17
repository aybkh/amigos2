import { supabase } from './supabase'
import { TABLES } from '../lib/constants'

export const messagesService = {
  async getAll() {
    const { data, error } = await supabase
      .from(TABLES.CONTACT_MESSAGES)
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async getUnreadCount() {
    const { count, error } = await supabase
      .from(TABLES.CONTACT_MESSAGES)
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false)
    if (error) throw error
    return count ?? 0
  },

  async markAsRead(id) {
    const { error } = await supabase
      .from(TABLES.CONTACT_MESSAGES)
      .update({ is_read: true })
      .eq('id', id)
    if (error) throw error
  },

  async markAsUnread(id) {
    const { error } = await supabase
      .from(TABLES.CONTACT_MESSAGES)
      .update({ is_read: false })
      .eq('id', id)
    if (error) throw error
  },

  async delete(id) {
    const { error } = await supabase
      .from(TABLES.CONTACT_MESSAGES)
      .delete()
      .eq('id', id)
    if (error) throw error
  },
}
