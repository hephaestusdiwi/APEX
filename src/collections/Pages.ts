import type { CollectionConfig } from 'payload'
import { adminOnly, publishedOrStaff, staffOnly } from '../access'
import { projectBlocks } from '../blocks'
import { validateSlots } from '../blocks/Slots'
import { slugField } from '../fields/slug'
import { previewLinkEndpoint } from '../preview/endpoint'
import { seoField } from '../fields/seo'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt', 'preview'],
    // Wajib ada agar slot tombol Preview tampil. URL asli dibuat endpoint /preview-link (bertoken), bukan fungsi ini.
    preview: () => null,
    components: {
      edit: { PreviewButton: '/components/admin/PreviewButton#PreviewButton' },
    },
  },
  endpoints: [previewLinkEndpoint('pages')],
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
    {
      name: 'preview',
      type: 'ui',
      label: 'Preview',
      admin: { components: { Cell: '/components/admin/PreviewCell#PreviewCell' } },
    },
    seoField(),
  ],
}