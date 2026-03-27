import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import Intro from '@/components/intro'
import { getAllPosts, getAllTags } from '@/lib/api'
import Post from '@/interfaces/post'
import { Metadata } from 'next'

type Props = {
  params: Promise<{
    tag: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const capitalizedTag = decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1)

  const allPosts = getAllPosts([
    'ogImage',
  ], decodedTag) as unknown as Post[]
  const heroPost = allPosts[0]

  const metadata: Metadata = {
    title: `Posts tagged with ${capitalizedTag}`,
  }

  if (heroPost) {
    metadata.openGraph = {
      images: [
        {
          url: heroPost.ogImage.url,
          width: 1200,
          height: 630,
        },
      ],
    }
    metadata.twitter = {
      images: [heroPost.ogImage.url],
    }
  }
  
  return metadata
}

export default async function Tag({ params }: Props) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
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
  ], decodedTag) as unknown as Post[]

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

export async function generateStaticParams() {
  const tags = getAllTags()

  return tags.map((tag) => ({
    tag: tag,
  }))
}
