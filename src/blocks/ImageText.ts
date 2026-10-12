import  type { Block } from 'payload'
import {
    BoldFeature,
    ItalicFeature,
    LinkFeature,
    ParagraphFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { layoutField } from '@/fields/layout'

export const ImageTextBlock: Block = {
    slug: 'imageText',
    interfaceName: 'ImageTextBlock',
    labels: { singular: 'Image + Text', plural: 'Image + Text' },
    fields: [
        { name: 'media', type: 'upload', relationTo: 'media', required: true },
        {
            name: 'body',
            type: 'richText',
            required: true,
            editor: lexicalEditor({
                features: [ParagraphFeature(), BoldFeature(), ItalicFeature(), LinkFeature()],
            }),
        },
        {
            name: 'imageSide',
            type: 'select',
            defaultValue: 'right',
            options: [
                { label: 'Gambar di kiri', value: 'left' },
                { label: 'Gambar di kanan', value: 'right' },
            ],
        },
        {
            name: 'includeMeta',
            type: 'checkbox',
            defaultValue: false,
            label: 'Sertakan meta project di kolom teks',
        },
        layoutField(),
    ],
}