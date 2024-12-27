import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@sanity/client";

const client = createClient({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pvx62i8z",
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-12-28', // Add this line with current date
});

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { _id, name, email, comment } = req.body;

    if (!_id || !name || !email || !comment) {
      return res
        .status(400)
        .json({ message: "Missing required fields (_id, name, email, comment)." });
    }

    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id,
      },
      name,
      email,
      comment,
      approved: false, // Add this to require approval before comments show
    });

    console.log("Comment submitted");
    return res.status(200).json({ message: "Comment submitted successfully!" });
  } catch (err) {
    console.error("Error submitting comment:", err);
    return res.status(500).json({ 
      message: "Couldn't submit comment.", 
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  }
}

