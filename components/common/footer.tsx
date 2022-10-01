import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      as="footer"
      width="100%"
      textAlign="center"
      py="6"
      px={{base: '4', md: '8'}}
    >
      <Text>&copy;&nbsp;{new Date().getFullYear()}&nbsp;Kobayashi. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
