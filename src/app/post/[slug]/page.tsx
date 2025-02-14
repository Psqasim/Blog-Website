// app/post/[slug]/page.tsx
"use client";
import { useEffect, useState, use } from "react";
import PortableText from "react-portable-text";
import { useForm } from "react-hook-form";
import { Post } from "../../../../typing";
import { urlFor } from "../../../../sanity/lib/image";
import { client } from "../../../../sanity/lib/client";
import { Loader2 } from "lucide-react";
import Header from "@/app/Compenents/Header";
import Footer from "@/app/Compenents/Footer";
import Image from "next/image";
export const revalidate = 0
interface Props {
  params: Promise<{ slug: string }>;
}

interface FormInputs {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

export default function PostPage({ params }: Props) {
  const resolvedParams = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    async function fetchPost() {
      const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        publishedAt,
        title,
        author->{
          name,
          image
        },
        'comments': *[_type == "comment" && post._ref == ^._id && approved == true],
        description,
        mainImage,
        slug,
        body
      }`;

      const data = await client.fetch(query, { slug: resolvedParams.slug });
      setPost(data);
    }

    fetchPost();
  }, [resolvedParams.slug]);

  const onSubmit = async (data: FormInputs) => {
    try {
      const response: any = await fetch("/api/createComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit comment.");
      }

      setSubmitted(true);
      setErrorMessage("");
      reset();
    } catch (error) {
      setSubmitted(false);
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  };

  if (!post)
    return (
      <>
        <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
          <div className="animate-pulse w-full max-w-3xl space-y-4">
            {/* Header */}
            <div className="h-10 bg-gray-300 rounded w-1/3"></div>

            {/* Main Image Placeholder */}
            <div className="h-48 bg-gray-300 rounded"></div>

            {/* Title Placeholder */}
            <div className="h-6 bg-gray-300 rounded w-2/3"></div>

            {/* Description Placeholder */}
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>

            {/* Author Info */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>

            {/* Content Placeholder */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            </div>

            {/* Comment Form Placeholder */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-20 bg-gray-300 rounded w-full"></div>
              <div className="h-10 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <div>
      <Header />
      {post.mainImage && (
        <Image
          src={urlFor(post.mainImage).url()}
          alt={post.title || "Post cover image"}
          width={1280}
          height={384}
          className="w-full h-96 object-cover"
        />
      )}

      <div className="max-w-3xl mx-auto mb-10">
        <article className="w-full mx-auto p-5 bg-secondaryColor/10">
          <h1 className="font-titleFont font-medium text-[32px] text-primary border-b-[1px] border-b-cyan-800 mt-10 mb-3">
            {post.title}
          </h1>

          {post.description && (
            <h2 className="font-bodyFont text-[18px] text-gray-500 mb-2">
              {post.description}
            </h2>
          )}

          {post.author && (
            <div className="flex items-center gap-2">
              {post.author.image && (
                <Image
                  src={urlFor(post.author.image).url()}
                  alt={`${post.author.name}'s profile`}
                  width={48}
                  height={48}
                  className=" rounded-full object-cover flex-shrink-0"
                />
              )}
              <p className="font-bodyFont text-base">
                Blog Post by{" "}
                <span className="text-secondaryColor font-bold">
                  {post.author.name}
                </span>{" "}
                - Published at {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </div>
          )}

          <div className="mt-10">
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}
              projectId={
                process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "f1735eww"
              }
              content={post.body}
              serializers={{
                h1: (props: any) => (
                  <h1
                    className="text-3xl font-bold my-5 font-titleFont"
                    {...props}
                  />
                ),
                h2: (props: any) => (
                  <h2
                    className="text-2xl font-bold my-5 font-titleFont"
                    {...props}
                  />
                ),
                h3: (props: any) => (
                  <h3
                    className="text-2xl font-bold my-5 font-titleFont"
                    {...props}
                  />
                ),
                li: ({ children }: any) => (
                  <li className="ml-4 list-disc">{children}</li>
                ),
                link: ({ href, children }: any) => (
                  <a href={href} className="text-cyan-500 hover:underline">
                    {children}
                  </a>
                ),
              }}
            />
          </div>
        </article>

        <hr className="max-w-lg my-5 mx-auto border-[1px] border-secondaryColor" />

        {/* Comment Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-7 flex flex-col gap-6"
        >
          <input {...register("_id")} type="hidden" value={post._id} />

          <label className="flex flex-col">
            <span className="font-titleFont font-semibold text-base">Name</span>
            <input
              {...register("name", { required: "Name is required" })}
              className="text-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl shadow-secondaryColor"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </label>

          <label className="flex flex-col">
            <span className="font-titleFont font-semibold text-base">
              Email
            </span>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="text-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl shadow-secondaryColor"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </label>

          <label className="flex flex-col">
            <span className="font-titleFont font-semibold text-base">
              Comment
            </span>
            <textarea
              {...register("comment", { required: "Comment is required" })}
              className="text-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl shadow-secondaryColor"
              rows={6}
              placeholder="Enter your comment"
            />
            {errors.comment && (
              <p className="text-red-500 text-sm mt-1">
                {errors.comment.message}
              </p>
            )}
          </label>

          <button
            type="submit"
            className="w-full bg-bgColor text-white text-base font-titleFont font-semibold tracking-wider uppercase py-2 rounded-sm hover:bg-secondaryColor duration-300"
          >
            Submit
          </button>

          {submitted && (
            <p className="text-green-500 text-sm mt-3">
              Comment submitted successfully!
            </p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-3">{errorMessage}</p>
          )}
        </form>

        {/* Comments Display */}
        <div className="w-full flex flex-col p-10 mx-auto shadow-bgColor shadow-lg space-y-2 mt-4">
          <h3 className="text-3xl font-titleFont font-semibold">Comments</h3>
          <hr />
          {post.comments?.map((comment: any) => (
            <div key={comment._id}>
              <p>
                <span className="text-secondaryColor">{comment.name}:</span>{" "}
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
