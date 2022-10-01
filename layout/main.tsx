import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import Header from './../components/common/header';
import Footer from './../components/common/footer';

type Props = {
  children: ReactNode;
};

const Main = ({children, ...props}: Props) => {
  return (
    <Box as="main">
      <Box width="100%" height="100%" margin="0" padding="0" {...props}>
        <Header />
          <Box marginTop="14">{children}</Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Main;
