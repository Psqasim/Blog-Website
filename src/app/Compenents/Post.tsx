import "slick-carousel/slick/slick.css";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../../sanity/lib/image";
import { Post } from "../../../typing";
export const revalidate = 0
interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
  return (
    <div id="post">
      {/* ============ Post Part Start here ========= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-6">
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug?.current ?? ""}`}>
              <div className="border-[1px] border-secondaryColor border-opacity-40 h-[400px] sm:h-[450px] group">
                <div className="relative h-[55%] w-full overflow-hidden">
                  {post.mainImage ? (
                    <Image
                      alt="blog-pic"
                      src={urlFor(post.mainImage).url()!}
                      width={640}
                      height={640}
                      className="object-cover brightness-75 group-hover:brightness-100 duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-between h-[45%] p-3 sm:p-4">
                  <div>
                    <div className="flex justify-between items-center pb-2 border-b-[1px] border-b-gray-500">
                      <h3 className="text-base text-green-700 sm:text-lg font-semibold truncate pr-2">
                        {post.title || "Untitled Post"}
                      </h3>
                      {post.author?.image ? (
                        <Image
                          width={40}
                          height={40}
                          className=" sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                          src={urlFor(post.author.image).url()!}
                          alt="authorImage"
                        />
                      ) : (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-sm sm:text-base line-clamp-2">
                      {post.description
                        ? `${post.description.substring(0, 60)}...`
                        : "No description available"}{" "}
                      by -{" "}
                      <span className="font-semibold">
                        {post.author?.name || "Unknown"}
                      </span>
                    </p>
                  </div>
                  {/* Read More Button */}

                  <div className="w-full bg-transparent hover:bg-green-700 text-green-700 hover:text-white border-2 border-green-700 font-semibold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center group">
                    <span>Read More</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* ============ Post Part End here =========== */}
    </div>
  );
}
