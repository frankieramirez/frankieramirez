import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    related: z.array(reference('blog')).default([]),
    draft: z.boolean().default(false),
    source: z.url().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }).refine((post) => !post.updated || post.updated >= post.date, {
    message: 'Updated date must be on or after publication.',
    path: ['updated'],
  }),
});

export const collections = { blog };
