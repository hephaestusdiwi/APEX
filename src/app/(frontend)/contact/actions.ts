'use server'

import { headers } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'
import { rateLimit } from '@/lib/rateLimit'

export type ContactField = 'name' | 'email' | 'subject' | 'message'

export type ContactState = {
  ok: boolean
  message?: string
  errors?: Partial<Record<ContactField, string>>
  values?: Record<ContactField, string>
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const text = (formData: FormData, key: string): string => {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  if (text(formData, 'website')) return { ok: true }

  const values = {
    name: text(formData, 'name'),
    email: text(formData, 'email'),
    subject: text(formData, 'subject'),
    message: text(formData, 'message'),
  }

  const errors: ContactState['errors'] = {}
  if (!values.name) errors.name = 'Nama wajib diisi.'
  else if (values.name.length > 120) errors.name = 'Maksimal 120 karakter.'

  if (!values.email) errors.email = 'Email wajib diisi.'
  else if (values.email.length > 254 || !EMAIL.test(values.email)) errors.email = 'Format email tidak valid.'

  if (values.subject.length > 200) errors.subject = 'Maksimal 200 karakter.'

  if (!values.message) errors.message = 'Pesan wajib diisi.'
  else if (values.message.length > 5000) errors.message = 'Maksimal 5000 karakter.'

  if (Object.keys(errors).length > 0) return { ok: false, errors, values }

  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  if (!rateLimit(`contact:${ip}`, 5, 15 * 60 * 1000)) {
    return { ok: false, message: 'Terlalu banyak pesan. Coba lagi beberapa menit lagi.', values }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({ collection: 'contacts', data: { ...values, status: 'new' } })
    return { ok: true }
  } catch (err) {
    console.error('Gagal menyimpan pesan kontak', err)
    return { ok: false, message: 'Pesan gagal dikirim. Silakan coba lagi.', values }
  }
}
