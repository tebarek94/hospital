import { Box, Heading, Text, Flex, List, ListItem, ListIcon, useColorModeValue } from '@chakra-ui/react';
import { FaMedkit, FaUserMd, FaMicroscope } from 'react-icons/fa';

export const ServicesSection = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  
  return (
    <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
      <Heading as="h3" size="lg" mb={4} color="blue.600">
        Our Services
      </Heading>
      <Text mb={4}>We offer comprehensive medical care including:</Text>
      
      <Flex wrap="wrap" justify="space-between">
        <Box width={['100%', '48%']} mb={4}>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={FaMedkit} color="blue.500" />
              Emergency Care
            </ListItem>
            {/* Add other list items */}
          </List>
        </Box>
        {/* Add second column */}
      </Flex>
      <Text mt={4}>
        Additional services include dermatology, dentistry, orthopedics, ophthalmology, and TB/HIV screening.
      </Text>
    </Box>
  );
};