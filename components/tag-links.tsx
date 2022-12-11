import Link from 'next/link'

type Props = {
  tags: Array<string>
}

const CommaSeparator = ({ i, length }) => {
  return i + 1 !== length &&
      <>, </>
}

const TagLinks = ({ tags }: Props) => {
  return (
    <div className="mb-6 text-lg">
      tags: {tags.map((tag, i, {length}) => (
        <span key={tag}>
          <Link className='hover:underline' as={`/tags/${tag.toLowerCase()}`} href="/tags/[tag]">
            {tag}
          </Link>
          <CommaSeparator i={i} length={length} />
        </span>
      ))}
    </div>
  )
}

export default TagLinks