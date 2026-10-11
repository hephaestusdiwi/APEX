import type { CollectionConfig } from 'payload'
import { adminOnly, isAdmin, isStaff, selfOrAdmin } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role'],
  },
  auth: true,
  access: {
    // Hanya staff (admin/editor) yang boleh masuk admin panel.
    admin: ({ req }) => isStaff(req.user),
    create: adminOnly,
    read: selfOrAdmin,
    update: selfOrAdmin,
    delete: adminOnly,
  },
  hooks: {
    beforeChange: [
      // User pertama selalu admin, apa pun isi formnya.
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data
        const { totalDocs } = await req.payload.count({ collection: 'users', req })
        return totalDocs === 0 ? { ...data, role: 'admin' } : data
      },
    ],
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        // Membuat user sudah dibatasi admin di level collection (+ pendaftaran user pertama).
        create: () => true,
        // Ganti role hanya admin; editor tidak bisa menaikkan dirinya sendiri.
        update: ({ req }) => isAdmin(req.user),
      },
    },
  ],
}