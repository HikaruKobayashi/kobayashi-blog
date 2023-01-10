import { ReactElement } from "react";
import { css } from "@emotion/react";
import { mqMax, mqMin } from "../styles/media-queries";
import { client } from "../libs/client";
import type { Blog, Tag } from "../types/blog";
import Layout from "../layout/main";
import Card from "../components/blog/card";
import Pagination from "../components/common/pagination";
import Sidebar from "../components/common/main-sidebar";

const Home = ({
  blogs,
  totalCount,
  tags,
}: {
  blogs: Blog[];
  totalCount: number;
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
        <Pagination totalCount={totalCount} currentPage={1} />
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
    gap: 40px 0;
  `,
  item: css`
    width: calc(50% - 5px);
    &:last-child,
    &:nth-last-of-type(2) {
      margin-bottom: 0;
    }
    ${mqMin("md")} {
      width: calc(50% - 10px);
    }
  `,
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps = async () => {
  const blog = await client.get({
    endpoint: "blog",
    queries: { limit: 8, offset: 0 },
  });

  const tag = await client.get({
    endpoint: "tag",
  });

  return {
    props: {
      blogs: blog.contents,
      totalCount: blog.totalCount,
      tags: tag.contents,
    },
  };
};
