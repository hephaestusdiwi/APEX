import type { GlobalConfig } from "payload";
import { adminOnly } from '../access'

export const SiteSettings: GlobalConfig = {
    slug: 'site-settings',
    label: 'Site Settings',
    access: {
        read: () => true,
        update: adminOnly,
    },
    fields: [
        {
            name: 'siteName',
            type: 'text',
            required: true,
        },
        {
            name: 'navigation',
            type: 'array',
            label: { singular: 'Item', plural: 'Navigasi' },
            fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
            ],
        },
    ],
}