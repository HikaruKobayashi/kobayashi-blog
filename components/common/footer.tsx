import { css } from "@emotion/react";

const Footer = () => {
  return (
    <footer css={styles.footer}>
      <p>
        &copy;&nbsp;{new Date().getFullYear()}&nbsp;Kobayashi. All rights
        reserved.
      </p>
    </footer>
  );
};

const styles = {
  footer: css`
    width: 100%;
    height: auto;
    text-align: center;
    padding: 12px 0;
  `,
};

export default Footer;
