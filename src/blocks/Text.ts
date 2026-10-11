import type { Block } from 'payload'
import {
    BoldFeature,
    ItalicFeature,
    LinkFeature,
    ParagraphFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { layoutField } from '@/fields/layout'

export const TextBlock: Block = {
    slug: 'text',
    interfaceName: 'TextBlock',
    labels: { singular: 'Text', plural: 'Text' },
    fields: [
        {
            name: 'body',
            type: 'richText',
            required: true,
            editor: lexicalEditor({
                features: [ParagraphFeature(), BoldFeature(), ItalicFeature(), LinkFeature()],
            }),
        },
        layoutField(),
    ],
}