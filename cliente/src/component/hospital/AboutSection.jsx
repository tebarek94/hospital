import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';

export const AboutSection = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  
  return (
    <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
      <Heading as="h3" size="lg" mb={4} color="blue.600">
        About Our Hospital
      </Heading>
      <Text mb={4}>
        Wolkite University Specialized Hospital, located in Wolkite, Ethiopia, is a public hospital offering a wide range of medical services. Established in June 2019, we are dedicated to providing high-quality, patient-centered healthcare.
      </Text>
      <Text>
        Our mission is to serve the Central Ethiopia region with a focus on disease prevention, health promotion, and reducing the burden of illness and mortality in the area.
      </Text>
    </Box>
  );
};