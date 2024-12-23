import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { sanityClient, urlFor } from "../../sanity";
import type { Post } from "../../typing";
import { GetStaticProps } from "next";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  post: Post;
}

interface Inputs {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

const Post = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Track error messages
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch("/api/createComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get server error details if available
        throw new Error(errorData.message || "Failed to submit your comment.");
      }

      setSubmitted(true);
      setErrorMessage(""); // Clear any previous errors
      reset(); // Clear the form on successful submission
    } catch (error) {
      setSubmitted(false);

      // Check if error is an instance of Error
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <Header />
      {/* main Image */}
      <img
        src={urlFor(post.mainImage).url()!}
        alt="coverImage"
        className="w-full h-96 object-cover"
      />
      {/* article section*/}
      <div className="max-w-3xl mx-auto mb-10">
        <article className="w-full mx-auto p-5 bg-secondaryColor/10">
          <h1 className="font-titleFont font-medium text-[32px] text-primary border-b-[1px] border-b-cyan-800 mt-10 mb-3">
            {post.title}
          </h1>
          <h2 className="font-bodyFont text-[18px] text-gray-500 mb-2">
            {post.description}
          </h2>
          {/* for author image */}
          <div className="flex items-center gap-2">
            <img
              src={urlFor(post.author.image).url()!}
              alt="authorImage"
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <p className="font-bodyFont text-base">
              Blog Post by{" "}
              <span className=" text-secondaryColor font-bold">
                {post.author.name}
              </span>{" "}
              -Published at {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </div>
          {/* for body content */}
          <div className="mt-10 ">
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
                Link: ({ href, children }: any) => (
                  <a href={href} className="text-cyan-500 hover:underline">
                    {children}
                  </a>
                ),
              }}
            />
          </div>
        </article>
        {/* for comment section */}
        <hr className="max-w-lg my-5 mx-auto border-[1px] border-secondaryColor " />
        <div>
          <p className="text-xs text-secondaryColor uppercase font-titleFont font-bold">
            Enjoyed this article?
          </p>
          <h3 className="font-titleFont text-3xl font-bold">
            Leave a comment below!
          </h3>
          <hr className="py-2 mt-2" />
          {/* form section */}
          {/* genarte id for hooks form */}
          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-7 flex flex-col gap-6"
          >
            <input
              {...register("_id")}
              type="hidden"
              name="_id"
              value={post._id}
            />

            {/* Name Field */}
            <label htmlFor="name" className="flex flex-col">
              <span className="font-titleFont font-semibold text-base">
                Name
              </span>
              <input
                {...register("name", { required: "Name is required" })}
                className="text-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl shadow-secondaryColor"
                type="text"
                placeholder="Enter Your Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </label>

            {/* Email Field */}
            <label className="flex flex-col">
              <span className="font-titleFont font-semibold text-base">
                Email
              </span>
              <input
                {...register("email", { required: "Email is required" })}
                className="text-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl shadow-secondaryColor"
                type="email"
                placeholder="Enter Your Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </label>

            {/* Comment Field */}
            <label className="flex flex-col">
              <span className="font-titleFont font-semibold text-base">
                Comment
              </span>
              <textarea
                {...register("comment", { required: "Comment is required" })}
                className="text-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl shadow-secondaryColor"
                placeholder="Enter Your Comment"
                rows={6}
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

            {/* Success Message */}
            {submitted && (
              <p className="text-green-500 text-sm mt-3">
                Your comment has been submitted!
              </p>
            )}

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-sm mt-3">{errorMessage}</p>
            )}
          </form>

          {/* comments get */}
          <div className="w-full flex flex-col p-10 mx-auto shadow-bgColor shadow-lg space-y-2 mt-4">
            <h3 className="text-3xl font-titleFont font-semibold">Comments</h3>
            <hr />
            {post.comments.map((Comment) => (
              <div key={Comment._id}>
                <p>
                  <span className="text-secondaryColor">{Comment.name}:</span>{" "}
                  {Comment.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
  _id,
  slug{
  current
      }
             }`;
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
  _id,
     publishedAt,
     title,
     author ->{
          name,
          image,
     },
       "comments":*[_type == "comment" && post._ref == ^._id && approved == true],
     description,
     mainImage,
     slug,
     body
    }`;
  const post = await sanityClient.fetch(query, {
    slug: params?.slug as string,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
