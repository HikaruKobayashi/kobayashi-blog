import Link from "next/link";
import { css } from "@emotion/react";

interface Props {
  blog: Blog;
}

interface Blog {
  id: string;
  title: string;
  content: string;
}

const Card = (props: Props) => {
  return (
    <div>
      <Link href={`/blog/${props.blog.id}`}>
        <a>
          <div>
            <p>yy/mm/dd</p>
            <p>created by XXX</p>
          </div>
          <p>Title</p>
          <p>Tag</p>
          <p>dummy tex dummy text dummy text dummy text dummy text</p>
        </a>
      </Link>
    </div>
  );
};

const styles = {};

export default Card;
