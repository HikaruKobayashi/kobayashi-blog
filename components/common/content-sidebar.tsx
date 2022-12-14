import Link from "next/link";
import { css } from "@emotion/react";
import { onlyPc } from "../../styles/util";
import TagItem from "../blog/tag-item";
import type { Tag } from "../../types/blog";

interface Props {
  text: string;
  id: string;
}

const Sidebar = (props: { toc: Props[]; tags: Tag[] }) => {
  return (
    <div>
      <div css={styles.sidebar}>
        <section css={styles.container}>
          <p css={styles.title}>On this page</p>
          <ul>
            {props.toc.map((head: Props, index: number) => (
              <li css={styles.headingItem} key={index}>
                <Link href={`#${head.id}`}>
                  <p css={styles.link}>{head.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section css={styles.container}>
          <p css={styles.title}>Tags on this page</p>
          <ul css={styles.tagContainer}>
            {props.tags.map((item, index) => (
              <li css={styles.tagItem} key={index}>
                <TagItem name={item.tag} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

const styles = {
  sidebar: css`
    position: sticky;
    top: 48px;
    ${onlyPc}
  `,
  container: css`
    width: 220px;
    height: auto;
    margin-bottom: 20px;
    &:last-child {
      margin: 0;
    }
  `,
  title: css`
    color: #555;
    padding-bottom: 4px;
    margin-bottom: 8px;
    border-bottom: 1px solid #ddd;
  `,
  headingItem: css`
    list-style: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  link: css`
    font-size: 14px;
    color: #555;
    cursor: pointer;
    &:hover {
      opacity: 0.75;
    }
  `,
  tagContainer: css`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
  `,
  tagItem: css`
    margin: 0 5px 5px 0;
    &:last-child {
      margin-right: 0;
    }
  `,
};

export default Sidebar;
