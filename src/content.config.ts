import {glob} from 'astro/loaders';
import {defineCollection, z} from 'astro:content';

const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    loader: glob({base: './src/content/blog', pattern: '**/*.{md,mdx}'}),
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        description: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
    }),
});

const portfolio = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        keywords: z.string(),
        client: z.string(),
        timeline: z.string(),
        role: z.string(),
        technologies: z.array(z.string()),
        category: z.string().optional().default('Uncategorized'),
        summary: z.string(),
        featuredImage: z.string().optional(),

        // Challenge section
        challengeIntroduction: z.string().optional(),
        challenges: z.array(z.string()).optional(),

        // Solution section
        solutionIntroduction: z.string().optional(),
        solution: z.array(
            z.object({
                title: z.string(),
                description: z.string(),
            })
        ).optional(),

        // Development Process
        process: z.array(
            z.object({
                title: z.string(),
                description: z.string(),
            })
        ).optional(),

        // Results metrics
        metrics: z.array(
            z.object({
                value: z.string(),
                label: z.string(),
            })
        ).optional(),

        // Technical highlights
        technical: z.array(
            z.object({
                title: z.string(),
                description: z.string(),
            })
        ).optional(),

        draft: z.boolean().optional().default(false),
    }),
});

export const collections = {blog, portfolio};
