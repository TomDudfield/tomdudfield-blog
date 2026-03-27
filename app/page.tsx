import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import Intro from '@/components/intro'
import { getAllPosts } from '@/lib/api'
import Post from '@/interfaces/post'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const allPosts = getAllPosts([
    'ogImage',
  ], '') as unknown as Post[]
  const heroPost = allPosts[0]

  if (!heroPost) {
    return {}
  }

  return {
    openGraph: {
      images: [
        {
          url: heroPost.ogImage.url,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      images: [heroPost.ogImage.url],
    }
  }
}

export default async function Index() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'ogImage',
    'excerpt',
    'draft',
    'tags'
  ], '') as unknown as Post[]

  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  return (
    <Container>
      <Intro />
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </Container>
  )
}
