import { css } from "@emotion/react";

const Header = () => {
  return (
    <header css={styles.header}>
      <p>kobayashi blog</p>
    </header>
  );
};

const styles = {
  header: css`
    width: 100%;
    height: auto;
    padding: 12px 6px;
    position: sticky;
    top: 0;
  `,
};

export default Header;
