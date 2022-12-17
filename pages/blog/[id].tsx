import { ReactElement } from "react";
import { GetStaticPaths } from "next";
import Image from "next/image";
import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark-dimmed.css";
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
  highlightedBody: string;
}

interface Context {
  params: { id: string };
  locales: any;
  locale: any;
  defaultLocale: any;
}

dayjs.extend(utc);
dayjs.extend(timezone);

const BlogId = ({ blog, highlightedBody }: Props) => {
  const toc = renderToc(blog.body);

  const createdAt = dayjs
    .utc(blog.createdAt)
    .tz("Asia/Tokyo")
    .format("YYYY-MM-DD");
  return (
    <main css={styles.main}>
      <section css={styles.container}>
        <div css={styles.imgContainer}>
          <Image css={styles.kv} src={blog.image.url} alt="" fill />
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
          <div css={styles.content}>
            <div
              css={styles.content}
              dangerouslySetInnerHTML={{
                __html: highlightedBody,
              }}
            />
          </div>
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
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
  `,
  title: css`
    font-size: 30px;
    color: #333;
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
    h1,
    h2,
    h3,
    h4 {
      font-weight: 600;
      color: #333;
    }
    div,
    p {
      color: #555;
      word-wrap: break-word;
    }
    h1,
    h2,
    h3,
    h4,
    p,
    ul,
    blockquote,
    pre {
      margin-bottom: 10px;
    }
    a {
      color: #333;
    }
    h2 {
      font-size: 20px;
    }
    h2 {
      font-size: 18px;
    }
    li {
      list-style-position: inside;
    }
    blockquote {
      border-left: 2px solid #555;
      padding-left: 10px;
      font-style: italic;
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

  const $ = cheerio.load(data.body);
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  return {
    props: {
      blog: data,
      highlightedBody: $.html(),
    },
  };
};
