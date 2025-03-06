// src/utils/siteMetadata.ts

// Default site URL (used for generating full URLs)
const siteUrl = "https://anthonytrivisano.com";

// Helper function to generate canonical URLs
export function getCanonicalURL(path: string): string {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // Remove trailing slash if present
    const finalPath = cleanPath.endsWith('/') ? cleanPath.slice(0, -1) : cleanPath;
    return finalPath ? `${siteUrl}/${finalPath}` : siteUrl;
}

// Helper function to generate breadcrumbs
export function generateBreadcrumbs(
    paths: Array<{ name: string; path: string }>
): Array<{ name: string; item: string }> {
    return paths.map(({ name, path }) => ({
        name,
        item: getCanonicalURL(path)
    }));
}

// Helper to generate breadcrumbs for blog posts
export function getBlogPostBreadcrumbs(
    postSlug: string,
    postTitle: string,
    category?: string
): Array<{ name: string; item: string }> {
    const breadcrumbs = [
        { name: "Home", path: "" },
        { name: "Blog", path: "blog" }
    ];

    if (category) {
        breadcrumbs.push({
            name: category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' '),
            path: `blog/category/${category}`
        });
    }

    breadcrumbs.push({ name: postTitle, path: `blog/${postSlug}` });

    return generateBreadcrumbs(breadcrumbs);
}

// Helper to generate breadcrumbs for portfolio items
export function getPortfolioBreadcrumbs(
    projectSlug: string,
    projectTitle: string
): Array<{ name: string; item: string }> {
    return generateBreadcrumbs([
        { name: "Home", path: "" },
        { name: "Portfolio", path: "portfolio" },
        { name: projectTitle, path: `portfolio/${projectSlug}` }
    ]);
}