import type { CollectionConfig } from 'payload'
import { adminOnly, publishedOrStaff, staffOnly } from '../access'
import { projectBlocks } from '../blocks'
import { validateSlots } from '../blocks/Slots'
import { slugField } from '../fields/slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
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
    { name: 'blocks', type: 'blocks', blocks: projectBlocks, validate: validateSlots },
  ],
}