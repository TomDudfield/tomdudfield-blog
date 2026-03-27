import Footer from '@/components/footer'
import '@/styles/index.css'
import { BLOG_NAME, BLOG_TITLE, BLOG_SUMMARY } from '@/lib/constants'
import { Metadata } from 'next'

const isProd = process.env.NODE_ENV === "production";
const base = isProd ? "https://www.tomdudfield.com" : "http://localhost:3000";

const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/brandflow-bucket/personal/blog/portfolio-og.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: BLOG_TITLE,
    template: `%s | ${BLOG_NAME}`
  },
  description: BLOG_SUMMARY,
  openGraph: {
    title: BLOG_TITLE,
    description: BLOG_SUMMARY,
    url: './',
    siteName: BLOG_NAME,
    locale: 'en_IE',
    type: 'website',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${BLOG_TITLE} | ${BLOG_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: BLOG_TITLE,
    description: BLOG_SUMMARY,
    site: '@tomdudfield',
    creator: '@tomdudfield',
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
  alternates: {
    canonical: './',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
