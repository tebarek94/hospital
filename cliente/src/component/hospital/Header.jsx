import { Box, Container, HStack, VStack, Heading, Text, Icon } from '@chakra-ui/react';
import { FaHospital } from 'react-icons/fa';

export const Header = () => {
  return (
    <Box bg="blue.600" color="white" py={4}>
      <Container maxW="container.lg">
        <HStack spacing={4} alignItems="center">
          <Icon as={FaHospital} boxSize={8} />
          <VStack align="flex-start" spacing={0}>
            <Heading as="h1" size="lg">Wolkite University Specialized Hospital</Heading>
            <Text fontSize="sm">Quality Healthcare for Central Ethiopia</Text>
          </VStack>
        </HStack>
      </Container>
    </Box>
  );
};