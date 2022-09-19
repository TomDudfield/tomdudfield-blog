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
        <>
          <Link as={`/tags/${tag}`} href="/tags/[tag]">
            <a className="hover:underline">{tag}</a>
          </Link>
          <CommaSeparator i={i} length={length} />
        </>
      ))}
    </div>
  )
}

export default TagLinks