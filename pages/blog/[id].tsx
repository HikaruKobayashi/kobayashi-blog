import { ReactElement } from 'react';
import { GetStaticPaths } from 'next';
import type { NextPageWithLayout } from '../_app';
import { client } from '../../libs/client';
import type { Blog } from '../../types/blog'
import Layout from './../../layout/main';

interface Props {
  blog: Blog;
};

interface Context {
  params: { id: string },
  locales: any,
  locale: any,
  defaultLocale: any
};

const BlogId = ({ blog }: Props) => {
  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
      />
    </main>
  );
}

export default BlogId;

BlogId.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content: any) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context: Context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};