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
    padding: 16px 0;
    color: #555;
    border-top: 1px solid #ddd;
  `,
};

export default Footer;
