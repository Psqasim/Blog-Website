import Head from "next/head";
import "slick-carousel/slick/slick.css";
import Banner from "../components/Banner";
import BannerBottom from "../components/BannerBottom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typing";
import Image from "next/image";
import Link from "next/link";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  return (
    <div>
      <Head>
        <title>My Blog | Explore the new horizon</title>
        <link rel="icon" href="/smallLogo.ico" />
      </Head>

      <main className="font-bodyFont">
        <Header />
        <Banner />
        <div className="max-w-7xl mx-auto h-60 relative">
          <BannerBottom />
        </div>

        {/* ============ Post Part Start here ========= */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-6">
            {posts.map((post) => (
              <Link key={post._id} href={`/post/${post.slug.current}`}>
                <div className="border-[1px] border-secondaryColor border-opacity-40 h-[400px] sm:h-[450px] group">
                  <div className="relative h-[55%] w-full overflow-hidden">
                    <Image
                      alt="blog-pic"
                      src={urlFor(post.mainImage).url()!}
                      fill
                      className="object-cover brightness-75 group-hover:brightness-100 duration-300 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex flex-col justify-between h-[45%] p-3 sm:p-4">
                    <div>
                      <div className="flex justify-between items-center pb-2 border-b-[1px] border-b-gray-500">
                        <h3 className="text-base sm:text-lg font-semibold truncate pr-2">
                          {post.title}
                        </h3>
                        <img
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                          src={urlFor(post.author.image).url()!}
                          alt="authorImage"
                        />
                      </div>
                      <p className="mt-2 text-sm sm:text-base line-clamp-2">
                        {post.description.substring(0, 60)}... by -{" "}
                        <span className="font-semibold">
                          {post.author.name}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* ============ Post Part End here =========== */}

        <Footer />
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
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
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};
