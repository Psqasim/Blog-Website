// app/api/createComment/route.ts
import { NextResponse } from 'next/server';
import { client } from '../../../sanity/lib/client';


export async function POST(req: Request) {
  try {
    const { _id, name, email, comment } = await req.json();

    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id
      },
      name,
      email,
      comment,
      approved: false
    });

    return NextResponse.json({ message: 'Comment submitted' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Could not submit comment' }, { status: 500 });
  }
}