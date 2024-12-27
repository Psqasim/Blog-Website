import { type SchemaTypeDefinition } from 'sanity'
import { post } from '../post'
import { authorType } from '../authorType'
import { blockContentType } from '../blockContentType'
import comment from '../comment'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post,authorType,blockContentType,comment],
}
