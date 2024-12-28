export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-12-26'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pvx62i8z'

export const useCdn = false

// This makes sure the values are set
export const token = process.env.SANITY_API_TOKEN

// Log configuration during initialization (remove in production)
