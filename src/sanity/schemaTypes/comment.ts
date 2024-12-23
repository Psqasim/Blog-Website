import { defineField, defineType } from 'sanity';

export const Comment = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',

  fields: [
    defineField({
      name: 'name', // 
      title: 'Name',
      type: 'string',
      description: 'Name of the commenter',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      title: 'Approve',
      name: 'approved',
      type: 'boolean',
      description: "Comments won't show on the site without approval",
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: { type: 'post' },
    }),
  ],
});
