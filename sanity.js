import { createClient } from "next-sanity";
import createImageUrlBulider from "@sanity/image-url"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||  'f1735eww';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || ' production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION  || '2024-12-22';

export const config = {
    projectId,
    dataset,
    apiVersion,
    useCdn:true,
};

export const sanityClient = createClient(config);
export const urlFor = (source) => createImageUrlBulider(config).image(source);
console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
