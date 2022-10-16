import Link from "next/link";
import { css } from "@emotion/react";

const TagItem = (props: { name: string }) => {
  return (
    <Link href="/">
      <a css={styles.tag}>{props.name}</a>
    </Link>
  );
};

const styles = {
  tag: css`
    display: block;
    width: fit-content;
    font-size: 12px;
    padding: 6px 12px;
    box-sizing: border-box;
    border-radius: 30px;
    color: #555;
    background-color: #ddd;
    cursor: pointer;
  `,
};

export default TagItem;
