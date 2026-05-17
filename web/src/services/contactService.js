import { supabase } from './supabase'
import { TABLES } from '../lib/constants'

export const contactService = {
  async send({ name, email, message }) {
    const { error } = await supabase
      .from(TABLES.CONTACT_MESSAGES)
      .insert({ name, email, message })
    if (error) throw error
  },
}
