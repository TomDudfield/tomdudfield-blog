import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="prose max-w-2xl mx-auto">
      <ReactMarkdown 
        className={markdownStyles['markdown']}
        components={{
          img: function ({ ...props }) {
            const substrings = props.alt?.split('{{');
            const alt = substrings[0].trim();

            const width = substrings[1] ? substrings[1].match(/(?<=w:\s?)\d+/g)[0] : 800;
            const height = substrings[1] ? substrings[1].match(/(?<=h:\s?)\d+/g)[0] : 600;

            return <Image src={props.src} alt={alt} width={width} height={height} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default PostBody