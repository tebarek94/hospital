import { Box, Container, Heading, Text } from '@chakra-ui/react';

export const HeroSection = () => {
  return (
    <Box py={12} bgGradient="linear(to-r, blue.500, blue.300)">
      <Container maxW="container.lg" textAlign="center">
        <Heading as="h2" size="xl" color="white" mb={4}>
          Compassionate Care, Advanced Medicine
        </Heading>
        <Text fontSize="xl" color="whiteAlpha.900">
          Serving the Central Ethiopia region since 2019
        </Text>
      </Container>
    </Box>
  );
};