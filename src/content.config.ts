import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { verifiedAtSchema } from './lib/source-date';

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/lessons' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    phase: z.string(),
    order: z.number().int().positive(),
    days: z.array(z.number().int().min(1).max(30)).min(2).max(3),
    estimatedMinutes: z.number().int().positive(),
    prerequisites: z.array(z.string()),
    outcomes: z.array(z.string()),
    sourceLinks: z.array(z.object({
      label: z.string(),
      url: z.url(),
      kind: z.enum(['primary', 'code', 'reference']),
      verifiedAt: verifiedAtSchema,
      jurisdiction: z.enum(['global', 'egypt', 'platform', 'company-public']),
      stability: z.enum(['stable', 'review-quarterly', 'review-before-use']),
      requiresInternalValidation: z.boolean(),
    })),
    artifacts: z.array(z.object({
      title: z.string(),
      description: z.string(),
      visibility: z.enum(['public-template', 'internal', 'restricted']),
    })).min(1),
  }),
});

export const collections = { lessons };
