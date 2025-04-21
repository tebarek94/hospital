import { Box, Heading, Flex, useColorModeValue } from '@chakra-ui/react';
import { FaUserMd, FaUsers, FaMicroscope } from 'react-icons/fa';

export const FeaturesSection = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  
  return (
    <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
      <Heading as="h3" size="lg" mb={4} color="blue.600">
        Key Features
      </Heading>
      <Flex wrap="wrap" justify="space-between">
        {/* Feature items */}
      </Flex>
    </Box>
  );
};