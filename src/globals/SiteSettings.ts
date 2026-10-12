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
        {
            name: 'homeHero',
            type: 'group',
            label: 'Hero Home',
            fields: [
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'heading', type: 'text' },
                { name: 'tagline', type: 'textarea' },
            ],
        },
        {
            name: 'instagramUrl',
            type: 'text',
            label: 'URL Instagram',
            validate: (value?: string | null) =>
                !value || /^https?:\/\//i.test(value) || 'Harus diawali https://',
        },
    ],
}