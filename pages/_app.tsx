import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/reset.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const PopcornFront = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <>
      <Head>
        <title>Kobayashi Blog</title>
        <meta name="author" content="Kobayashi" />
        <meta name="Description" content="Kobayashi's blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@0719kobayashi" />
        <meta name="twitter:creator" content="@0719kobayashi" />
        <meta property="og:site_name" content="Kobayashi's blog" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ja_JP" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default PopcornFront;
