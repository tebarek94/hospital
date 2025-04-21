import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const ReceptionistBilling = () => {
  return (
    <Box p={4} borderRadius="md" bg="gray.50" boxShadow="md">
      <Heading size="lg" mb={4} textAlign="center">
        Receptionist Billing
      </Heading>
      <p>Welcome to the billing management section. Details and actions will go here.</p>
    </Box>
  );
};

export default ReceptionistBilling;
