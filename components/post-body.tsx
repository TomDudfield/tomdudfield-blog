import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight'
import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="prose max-w-2xl mx-auto">
      <ReactMarkdown 
        className={markdownStyles['markdown']}
        rehypePlugins={[rehypeHighlight]}
        components={{
          img: function ({ ...props }) {
            const substrings = props.alt?.split('{{');
            const alt = substrings[0].trim();

            const width = substrings[1] ? substrings[1].match(/(?<=w:\s?)\d+/g)[0] : 800;
            const w: number = +width;
            const height = substrings[1] ? substrings[1].match(/(?<=h:\s?)\d+/g)[0] : 600;
            const h: number = +height;

            return <Image src={props.src} alt={alt} width={w} height={h} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default PostBody