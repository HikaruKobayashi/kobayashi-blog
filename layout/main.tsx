import { ReactNode } from "react";
import { css } from "@emotion/react";
import { mqMin } from "../styles/media-queries";
import Header from "./../components/common/header";
import Footer from "./../components/common/footer";

type Props = {
  children: ReactNode;
};

const Main = ({ children, ...props }: Props) => {
  return (
    <main css={styles.main}>
      <div css={styles.container} {...props}>
        <Header />
        <div css={styles.wrapper}>{children}</div>
        <Footer />
      </div>
    </main>
  );
};

const styles = {
  main: css`
    width: 100%;
    height: 100%;
  `,
  container: css`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  `,
  wrapper: css`
    flex: 1;
    width: 100%;
    box-sizing: border-box;
    ${mqMin("md")} {
      width: 65%;
      margin: 0 auto;
      padding: 0;
    }
  `,
};

export default Main;
