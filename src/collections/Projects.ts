import type { CollectionConfig } from 'payload'
import { adminOnly, publishedOrStaff, staffOnly } from '@/access'
import { projectBlocks } from '../blocks'
import { validateSlots } from '@/blocks/Slots'
import { slugField } from '../fields/slug'
import { use } from 'react'
import { sign } from 'crypto'

export const Projects: CollectionConfig = {
    slug: 'projects',
    orderable: true,
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    },
    versions: {
        drafts: true,
        maxPerDoc: 25,
    },
    access: {
      read: publishedOrStaff,
      create: staffOnly,
      update: staffOnly,
      delete: adminOnly,
    },
    fields: [
        { name: 'title', type: 'text', required: true },
        slugField(),
        { name: 'hero', type: 'upload', relationTo: 'media' },
            {
      name: 'home',
      type: 'group',
      label: 'Tampilan di Home',
      fields: [
        {
          name: 'cover',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Gambar di index home. Kosong = pakai hero.' },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'size',
              type: 'select',
              defaultValue: 'medium',
              admin: { width: '50%' },
              options: [
                { label: 'Small', value: 'small' },
                { label: 'Medium', value: 'medium' },
                { label: 'Large', value: 'large' },
                { label: 'Full', value: 'full' },
              ],
            },
            {
              name: 'align',
              type: 'select',
              defaultValue: 'left',
              admin: { width: '50%' },
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
              ],
            },
          ],
        },
      ],
    },
        {
            name: 'meta',
            type: 'array',
            label: { singular: 'Meta', plural: 'Meta'},
            admin: { description: 'Label bebas: Company, Role, Client, Location, dst' },
            fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'text', required: true },
            ],
        },
            { name: 'blocks', type: 'blocks', blocks: projectBlocks, validate: validateSlots },
    ],
}