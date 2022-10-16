import { ReactElement } from "react";
import { GetStaticPaths } from "next";
import Image from "next/image";
import { css } from "@emotion/react";
import { mqMin, mqMax } from "../../styles/media-queries";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { client } from "../../libs/client";
import { renderToc } from "../../libs/render-toc";
import type { Blog } from "../../types/blog";
import Layout from "./../../layout/main";
import Sidebar from "../../components/common/content-sidebar";
import { IconContext } from "react-icons";
import { AiOutlineClockCircle } from "react-icons/ai";

interface Props {
  blog: Blog;
}

interface Context {
  params: { id: string };
  locales: any;
  locale: any;
  defaultLocale: any;
}

dayjs.extend(utc);
dayjs.extend(timezone);

const BlogId = ({ blog }: Props) => {
  const toc = renderToc(blog.body);

  const createdAt = dayjs
    .utc(blog.createdAt)
    .tz("Asia/Tokyo")
    .format("YYYY-MM-DD");
  return (
    <main css={styles.main}>
      <section css={styles.container}>
        <div css={styles.imgContainer}>
          <Image css={styles.kv} src={blog.image.url} alt="" layout="fill" />
        </div>
        <div css={styles.wrapper}>
          <div css={styles.titleContainer}>
            <h1 css={styles.title}>{blog.title}</h1>
            <div css={styles.dayContainer}>
              <span css={styles.icon}>
                <IconContext.Provider value={{ size: "18px", color: "#555" }}>
                  <AiOutlineClockCircle />
                </IconContext.Provider>
              </span>
              <p css={styles.day}>{createdAt}</p>
            </div>
          </div>
          <div
            css={styles.content}
            dangerouslySetInnerHTML={{
              __html: `${blog.body}`,
            }}
          />
        </div>
      </section>
      <Sidebar toc={toc} tags={blog.tags} />
    </main>
  );
};

const styles = {
  main: css`
    width: 100%;
    height: 100%;
    ${mqMin("md")} {
      display: flex;
      justify-content: space-between;
    }
  `,
  container: css`
    ${mqMin("md")} {
      min-width: 380px;
      padding-right: 20px;
    }
    ${mqMin("lg")} {
      min-width: 450px;
      padding-right: 120px;
    }
  `,
  titleContainer: css`
    padding-bottom: 12px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
  `,
  title: css`
    font-size: 30px;
    color: #555;
    font-weight: 600;
    margin-top: 12px;
    word-wrap: break-word;
    line-height: 1.2;
  `,
  imgContainer: css`
    > span {
      position: unset !important;
    }
  `,
  kv: css`
    position: relative !important;
    width: 100% !important;
    height: unset !important;
  `,
  wrapper: css`
    ${mqMax("md")} {
      padding: 0 10px;
    }
  `,
  dayContainer: css`
    display: flex;
    align-items: center;
  `,
  icon: css`
    display: block;
    width: 18px;
    height: 18px;
    margin-right: 5px;
  `,
  day: css`
    color: #555;
  `,
  content: css`
    p {
      word-wrap: break-word;
    }
    img {
      max-width: 100%;
    }
  `,
};

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
