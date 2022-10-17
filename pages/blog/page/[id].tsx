import { ReactElement } from "react";
import { css } from "@emotion/react";
import { mqMax, mqMin } from "./../../../styles/media-queries";
import { client } from "./../../../libs/client";
import type { Blog, Tag } from "./../../../types/blog";
import Layout from "./../../../layout/main";
import Card from "./../../../components/blog/card";
import Pagination from "./../../../components/common/pagination";
import Sidebar from "./../../../components/common/main-sidebar";

const PER_PAGE = 8;

const PageIndex = ({
  blogs,
  totalCount,
  currentPage,
  tags,
}: {
  blogs: Blog[];
  totalCount: number;
  currentPage: number;
  tags: Tag[];
}) => {
  return (
    <main css={styles.container}>
      <div css={styles.wrapper}>
        <ul css={styles.contents}>
          {blogs.map((blog: Blog) => (
            <li css={styles.item} key={blog.id}>
              <Card blog={blog} />
            </li>
          ))}
        </ul>
        <Pagination totalCount={totalCount} currentPage={currentPage} />
      </div>
      <Sidebar tags={tags} />
    </main>
  );
};

const styles = {
  container: css`
    ${mqMax("md")} {
      padding: 0 10px;
    }
    ${mqMin("md")} {
      display: flex;
      justify-content: space-between;
    }
  `,
  wrapper: css`
    flex: 1;
    ${mqMin("md")} {
      min-width: 380px;
      padding-right: 20px;
    }
    ${mqMin("lg")} {
      min-width: 450px;
      padding-right: 120px;
    }
  `,
  contents: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
  `,
  item: css`
    width: calc(50% - 5px);
    margin-bottom: 40px;
    &:last-child,
    &:nth-last-of-type(2) {
      margin-bottom: 0;
    }
    ${mqMin("md")} {
      width: calc(50% - 10px);
    }
  `,
};

export default PageIndex;

PageIndex.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths = async () => {
  const repos = await client.get({ endpoint: "blog" });
  const pageNumber = [];

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
    (repo) => `/blog/page/${repo}`
  );

  return { paths, fallback: false };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;

  const blog = await client.get({
    endpoint: "blog",
    queries: { offset: (id - 1) * 8, limit: 8 },
  });

  const tag = await client.get({
    endpoint: "tag",
  });

  return {
    props: {
      blogs: blog.contents,
      totalCount: blog.totalCount,
      currentPage: id,
      tags: tag.contents,
    },
  };
};
