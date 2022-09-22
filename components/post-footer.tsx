import TagLinks from './tag-links'

type Props = {
  tags: Array<string>
}

const PostFooter = ({ tags }: Props) => {
  return (
    <>
      <div className="prose max-w-2xl mx-auto">
        <TagLinks tags={tags} />
      </div>
    </>
  )
}

export default PostFooter
