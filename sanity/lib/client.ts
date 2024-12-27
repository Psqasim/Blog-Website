import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pvx62i8z",
  apiVersion,
  token: process.env.SANITY_API_TOKEN || "",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
