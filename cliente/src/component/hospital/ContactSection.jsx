import { Box, Heading, VStack, HStack, Link, useColorModeValue } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe } from 'react-icons/fa';

export const ContactSection = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  
  return (
    <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
      <Heading as="h3" size="lg" mb={4} color="blue.600">
        Contact Us
      </Heading>
      <VStack spacing={4} align="flex-start">
        {/* Contact items */}
      </VStack>
    </Box>
  );
};