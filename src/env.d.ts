interface ImportMetaEnv {
    readonly SENDGRID_API_KEY: string
    readonly FROM_EMAIL: string
    readonly TO_EMAIL: string
    readonly SUPABASE_URL: string
    readonly SUPABASE_ANON_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}