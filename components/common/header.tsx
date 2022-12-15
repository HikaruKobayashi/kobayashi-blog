import Link from "next/link";
import { css } from "@emotion/react";
import { IconContext } from "react-icons";
import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai";

const Header = () => {
  return (
    <header css={styles.header}>
      <Link href="/">
        <p css={styles.link}>Kobayashi Blog</p>
      </Link>
      <div css={styles.container}>
        <a
          href="https://github.com/HikaruKobayashi/kobayashi-blog"
          css={styles.icon}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconContext.Provider value={{ size: "24px", color: "#555" }}>
            <AiFillGithub />
          </IconContext.Provider>
        </a>
        <a
          href="https://twitter.com/0719kobayashi"
          css={styles.icon}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconContext.Provider value={{ size: "24px", color: "#555" }}>
            <AiFillTwitterCircle />
          </IconContext.Provider>
        </a>
      </div>
    </header>
  );
};

const styles = {
  header: css`
    width: 100%;
    height: auto;
    padding: 12px;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    backdrop-filter: saturate(50%) blur(8px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
  `,
  container: css`
    display: flex;
    align-items: center;
  `,
  link: css`
    color: #555;
    cursor: pointer;
  `,
  icon: css`
    display: block;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
  `,
};

export default Header;
