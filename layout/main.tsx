import { ReactNode } from "react";
import { css } from "@emotion/react";
import Header from "./../components/common/header";
import Footer from "./../components/common/footer";
import Sidebar from "./../components/common/sidebar";

type Props = {
  children: ReactNode;
};

const Main = ({ children, ...props }: Props) => {
  return (
    <main css={styles.main}>
      <div css={styles.container} {...props}>
        <Header />
        <div css={styles.wrapper}>
          <div>{children}</div>
          <Sidebar />
        </div>
        <Footer />
      </div>
    </main>
  );
};

const styles = {
  main: css`
    width: 100%;
    height: 100vh;
  `,
  container: css`
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  `,
  wrapper: css`
    flex: 1;
  `,
};

export default Main;
