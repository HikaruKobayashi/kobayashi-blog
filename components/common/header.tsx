import Link from "next/link";
import { css } from "@emotion/react";
import { IconContext } from "react-icons";
import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai";

const Header = () => {
  return (
    <header css={styles.header}>
      <Link href="/">
        <a css={styles.link}>Kobayashi Blog</a>
      </Link>
      <div css={styles.container}>
        <Link href="/">
          <a css={styles.icon}>
            <IconContext.Provider value={{ size: "24px", color: "#555" }}>
              <AiFillGithub />
            </IconContext.Provider>
          </a>
        </Link>
        <Link href="/">
          <a css={styles.icon}>
            <IconContext.Provider value={{ size: "24px", color: "#555" }}>
              <AiFillTwitterCircle />
            </IconContext.Provider>
          </a>
        </Link>
      </div>
    </header>
  );
};

const styles = {
  header: css`
    width: 100%;
    height: auto;
    padding: 12px 6px;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    backdrop-filter: saturate(50%) blur(8px);
    display: flex;
    justify-content: space-between;
    align-items: center;
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
