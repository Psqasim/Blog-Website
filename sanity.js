import { createClient } from "next-sanity";
import createImageUrlBulider from "@sanity/image-url"



export const sanityClient = createClient(config);
export const urlFor = (source) => createImageUrlBulider(config).image(source);

