import Link from "next/link";
import Image from "next/image";
import { css } from "@emotion/react";
import { mqMin } from "../../styles/media-queries";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import type { Blog } from "./../../types/blog";
import { IconContext } from "react-icons";
import { AiOutlineClockCircle } from "react-icons/ai";

interface Props {
  blog: Blog;
}

dayjs.extend(utc);
dayjs.extend(timezone);

const Card = (props: Props) => {
  const createdAt = dayjs
    .utc(props.blog.createdAt)
    .tz("Asia/Tokyo")
    .format("YYYY-MM-DD");
  return (
    <Link href={`/blog/${props.blog.id}`}>
      <div css={styles.container}>
        <div css={styles.wrapper}>
          <div css={styles.imgContainer}>
            <Image
              css={styles.thumbnail}
              src={props.blog.image.url}
              alt=""
              fill
            />
          </div>
          <div css={styles.contentWrapper}>
            <div css={styles.dayContainer}>
              <span css={styles.icon}>
                <IconContext.Provider value={{ size: "15px", color: "#555" }}>
                  <AiOutlineClockCircle />
                </IconContext.Provider>
              </span>
              <p css={[styles.text, styles.day]}>{createdAt}</p>
            </div>
            <h2 css={[styles.text, styles.title]}>{props.blog.title}</h2>
            <div css={[styles.text, styles.bodyText]}>{props.blog.summary}</div>
          </div>
          <div css={styles.readWrapper}>
            <p css={[styles.text, styles.moreText]}>More reading...</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const styles = {
  container: css`
    display: block;
    width: 100%;
    height: 100%;
    min-height: 230px;
    text-decoration: none;
    cursor: pointer;
    ${mqMin("md")} {
      min-height: 330px;
    }
  `,
  wrapper: css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
  contentWrapper: css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin-top: 12px;
  `,
  imgContainer: css`
    > span {
      position: unset !important;
    }
  `,
  thumbnail: css`
    display: block !important;
    position: relative !important;
    width: 100% !important;
    height: 120px !important;
    object-fit: cover !important;
    &:hover {
      opacity: 0.75;
    }
    ${mqMin("md")} {
      height: 220px !important;
    }
  `,
  text: css`
    max-width: 100%;
    p {
      word-wrap: break-word;
    }
  `,
  dayContainer: css`
    display: flex;
    align-items: center;
  `,
  icon: css`
    margin-right: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  day: css`
    font-size: 12px;
    color: #555;
  `,
  title: css`
    color: #333;
    word-wrap: break-word;
  `,
  bodyText: css`
    font-size: 12px;
    color: #555;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-wrap: break-word;
  `,
  moreText: css`
    font-size: 12px;
    color: #555;
  `,
  readWrapper: css`
    margin-top: auto;
  `,
};

export default Card;
