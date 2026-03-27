import { notFound } from 'next/navigation'
import Container from '@/components/container'
import PostBody from '@/components/post-body'
import Header from '@/components/header'
import PostHeader from '@/components/post-header'
import PostFooter from '@/components/post-footer'
import { getPostBySlug, getAllPosts } from '@/lib/api'
import type PostType from '@/interfaces/post'
import { Metadata } from 'next'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug, ['title', 'excerpt', 'ogImage']) as unknown as PostType

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.ogImage.url],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.ogImage.url],
    }
  }
}

export default async function Post({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'excerpt',
    'tags'
  ]) as unknown as PostType

  if (!post?.slug) {
    return notFound()
  }

  return (
    <Container>
      <Header />
      <article className="mb-32">
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
        />
        <PostBody content={post.content} />
        <PostFooter tags={post.tags} />
      </article>
    </Container>
  )
}

export async function generateStaticParams() {
  const posts = getAllPosts(['slug']) as unknown as PostType[]

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
