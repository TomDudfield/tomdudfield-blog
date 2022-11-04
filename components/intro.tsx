import Link from 'next/link'
import { BLOG_NAME, BLOG_DESC } from '../lib/constants'

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">          
        <Link href="/">
          <a className="hover:underline">{BLOG_NAME}</a>
        </Link>
      </h1>
      <p className="text-center md:text-left text-lg mt-5 md:pl-8">{BLOG_DESC}</p>
    </section>
  )
}

export default Intro
