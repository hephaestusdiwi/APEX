import type { CollectionConfig } from "payload";
import { adminOnly, staffOnly } from '../access'

export const Videos: CollectionConfig = {
    slug: 'videos',
    access: {
        read: () => true,
        create: staffOnly,
        update: staffOnly,
        delete: adminOnly,
    },
    admin: {
        useAsTitle: 'filename',
    },
    fields: [],
    upload: {
        mimeTypes: ['video/mp4', 'video/webm'],
    },
}