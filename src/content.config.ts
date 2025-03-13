import {glob} from 'astro/loaders';
import {defineCollection, z} from 'astro:content';

const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    loader: glob({base: './src/content/blog', pattern: '**/*.{md,mdx}'}),
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string(),
        // Transform string to Date object
        date: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        author: z.string(),
        image: z.object({
            src: z.string(),
            alt: z.string()
        }),
        categories: z.array(z.string()),
        tags: z.array(z.string()),
        canonical: z.string().optional()
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

const services = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        keywords: z.string(),
        content: z.string(),
        image: z.string().optional(),
        icon: z.string().optional(),
        features: z.array(
            z.object({
                title: z.string(),
                description: z.string(),
            })
        ).optional(),
        benefits: z.array(z.string()).optional(),
        process: z.array(
            z.object({
                step: z.string(),
                description: z.string(),
            })
        ).optional(),
        faq: z.array(
            z.object({
                question: z.string(),
                answer: z.string(),
            })
        ).optional(),
        relatedServices: z.array(z.string()).optional(),
        casestudies: z.array(z.string()).optional(),
        draft: z.boolean().optional().default(false),
    }),
});

const locations = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        cityName: z.string(),
        description: z.string(),
        content: z.string(),
        image: z.string().optional(),
        keywords: z.string(),
        address: z.string(),
        mapUrl: z.string(),
        email: z.string().optional(),
        phone: z.string().optional(),
        servicesOffered: z.array(z.string()),
        localClients: z.array(
            z.object({
                name: z.string(),
                industry: z.string(),
                logo: z.string().optional(),
            })
        ).optional(),
        cityFeatures: z.array(
            z.object({
                title: z.string(),
                description: z.string(),
            })
        ).optional(),
        metaData: z.object({
            regionCode: z.string().optional(),
            country: z.string().default('Canada'),
            population: z.number().optional(),
            established: z.number().optional(),
        }).optional(),
        draft: z.boolean().optional().default(false),
    }),
});

const testimonials = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string(),
        company: z.string(),
        location: z.string(),
        quote: z.string(),
        avatar: z.string().optional(),
        position: z.string().optional(),
        projectLink: z.string().optional(),
        date: z.coerce.date().optional(),
        featured: z.boolean().optional().default(false),
        serviceCategory: z.string().optional(),
    }),
});

export const collections = {blog, portfolio, services, locations, testimonials};
