import type Author from './author'
import PostImage from './image'

type PostType = {
  slug: string
  title: string
  date: string
  coverImage: PostImage
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
  tags: Array<string>
}

export default PostType
