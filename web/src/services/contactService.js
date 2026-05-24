import { supabase } from './supabase'
import { TABLES } from '../lib/constants'

export const contactService = {
  async send({ name, email, phone, message }) {
    const { error } = await supabase
      .from(TABLES.CONTACT_MESSAGES)
      .insert({ name, email, phone, message })
    if (error) throw error
  },
}
