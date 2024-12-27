// for import is liya ya help data hai intelligence auto suggestion 
import { defineType,defineField,defineArrayMember } from "sanity"
export const post = defineType({
         name:'post',
         type:'document',
         title:'post',
         fields:[
            defineField({
                name:'title',
                type:'string',
                title:'Post Title',
                description:'Title of the post',
                validation: rule => rule.required()
                
            }),
            //slug field

            defineField(
                {
                    name:'slug',
                    type:'slug',
                    title:'Slug',
                    options:{
                        source:'title',
                        maxLength:96,
                    },
                    validation: rule => rule.required()
                },
                
            ),
            defineField({
                name: 'author',
                type: 'reference',
                to: {type: 'author'},
              }),
              defineField({
                name: 'description',
                title: 'Description',
                type:'string',
                
              }),
              defineField({
                name: 'mainImage',
                type: 'image',
                options: {
                  hotspot: true,
                },
                fields: [
                  {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                  }
                ]
              }),
              defineField({
                name: 'publishedAt',
                type: 'datetime',
              }),
              defineField({
                name: 'body',
                type: 'blockContent',
                title:'body'
              }),
            ],
            preview: {
                select: {
                  title: 'title',
                  author: 'author.name',
                  media: 'mainImage',
                },
                prepare(selection) {
                  const {author} = selection
                  return {...selection, subtitle: author && `by ${author}`}
                },
              },
         

})