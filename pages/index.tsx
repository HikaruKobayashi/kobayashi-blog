import { ReactElement } from "react";
import Link from "next/link";
import { client } from "../libs/client";
import type { Blog, Tag } from "../types/blog";
import Layout from "../layout/main";

type Props = {
  blogs: Blog[];
  tags: Tag[];
};

const Home: any = ({ blogs, tags }: Props) => {
  return (
    <main>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link href={`/blog/${blog.id}`}>
            <a>{blog.title}</a>
          </Link>
        </div>
      ))}
    </main>
  );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps = async () => {
  const blog = await client.get({ endpoint: "blog" });
  const tag = await client.get({ endpoint: "tag" });

  return {
    props: {
      blogs: blog.contents,
      tags: tag.contents,
    },
  };
};
