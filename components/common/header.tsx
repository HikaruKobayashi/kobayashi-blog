import { Box, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box
      as="header"
      width="100%"
      py="6"
      px={{base: '4', md: '8'}}
    >
      <Text>kobayashi blog.</Text>
    </Box>
  );
};

export default Header;
