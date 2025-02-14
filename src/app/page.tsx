import Banner from "./Compenents/Banner";
import BannerBottom from "./Compenents/BannerBottom";
import Footer from "./Compenents/Footer";
import Header from "./Compenents/Header";
import Post from "./Compenents/Post";
import { client } from "../../sanity/lib/client";

export const revalidate = 0
// Fetch posts from Sanity
async function fetchPosts() {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;

  const posts = await client.fetch(query);
  return posts;
}

// Main Home Component
export default async function Home() {
  const posts = await fetchPosts();

  return (
    <>
      <Header />
      <Banner />
      <BannerBottom />
      <Post posts={posts} />
      <Footer />
    </>
  );
}
