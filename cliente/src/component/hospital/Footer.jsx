import { Box, Container, Flex, Text, } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box bg="blue.600" color="white" py={6} mt={8}>

      <Container maxW="container.lg">
        <Flex direction={['column', 'row']} justify="space-between" align="center">

          
          <Text>&copy; {new Date().getFullYear()} Wolkite University Specialized Hospital</Text>
          <Text>Providing quality healthcare to Central Ethiopia</Text>

        </Flex>
      </Container>
    </Box>
  );
};