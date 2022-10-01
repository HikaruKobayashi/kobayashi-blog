import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import type {AppProps} from 'next/app';
import {ChakraProvider} from '@chakra-ui/react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const PopcornFront = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? (page => page);
  return getLayout(
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default PopcornFront;
