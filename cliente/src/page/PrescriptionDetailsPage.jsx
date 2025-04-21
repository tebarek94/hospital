import React, { useState, useEffect } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td,
  Box, Heading, Spinner, Alert, AlertIcon,
  useToast, Badge, Stat, StatLabel, StatNumber,
  StatHelpText, Stack
} from '@chakra-ui/react';
import axios from 'axios';

const PrescriptionDetailsPage = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const toast = useToast();

  useEffect(() => {
    const fetchPrescriptionDetails = async () => {
      try {
        const response = await axios.get(' http://localhost:5000/api/prescription-details');
        setDetails(response.data);
        
        // Calculate total value
        const total = response.data.reduce((sum, detail) => sum + detail.Price, 0);
        setTotalValue(total);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast({
          title: 'Error fetching prescription details',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchPrescriptionDetails();
  }, [toast]);

  if (loading) return <Spinner size="xl" mt={8} />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

  return (
    <Box>
      <Heading mb={6}>Prescription Medication Details</Heading>
      
      <Stack direction="row" spacing={4} mb={6}>
        <Stat p={4} bg="blue.50" borderRadius="md">
          <StatLabel>Total Prescriptions</StatLabel>
          <StatNumber>{details.length}</StatNumber>
        </Stat>
        <Stat p={4} bg="green.50" borderRadius="md">
          <StatLabel>Total Medication Value</StatLabel>
          <StatNumber>${totalValue.toFixed(2)}</StatNumber>
          <StatHelpText>Across all prescriptions</StatHelpText>
        </Stat>
      </Stack>
      
      <Box overflowX="auto">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Detail ID</Th>
              <Th>Prescription ID</Th>
              <Th>Drug Name</Th>
              <Th>Dosage</Th>
              <Th>Duration</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {details.map(detail => (
              <Tr key={detail.PrescriptionDetail_ID}>
                <Td>{detail.PrescriptionDetail_ID}</Td>
                <Td>{detail.Prescription_ID}</Td>
                <Td fontWeight="bold">{detail.Drug_Name}</Td>
                <Td>{detail.Dosage}</Td>
                <Td>{detail.Duration}</Td>
                <Td>
                  <Badge colorScheme="green">
                    ${detail.Price.toFixed(2)}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default PrescriptionDetailsPage;