import React, { useState, useEffect } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td,
  Box, Heading, Spinner, Alert, AlertIcon,
  useToast, Badge
} from '@chakra-ui/react';
import axios from 'axios';

const InsuranceInfoPage = () => {
  const [insuranceData, setInsuranceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchInsuranceData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/insurance-info');
        console.log('API Response:', response.data);
        setInsuranceData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast({
          title: 'Error fetching insurance data',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchInsuranceData();
  }, [toast]);

  if (loading) return <Spinner size="xl" mt={8} />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

  return (
    <Box>
      <Heading mb={6}>Insurance Information</Heading>
      <Box overflowX="auto">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Insurance ID</Th>
              <Th>Patient</Th>
              <Th>Provider</Th>
              <Th>Policy Number</Th>
              <Th>Coverage</Th>
            </Tr>
          </Thead>
          <Tbody>
            {insuranceData.map(insurance => (
              <Tr key={insurance.Insurance_ID}>
                <Td>{insurance.Insurance_ID}</Td>
                <Td>{`${insurance.F_name} ${insurance.L_name}`}</Td>
                <Td>{insurance.Insurance_Provider}</Td>
                <Td>{insurance.Policy_Number}</Td>
                <Td>
                  <Badge colorScheme="green">
                    ${insurance.Coverage_Amount.toLocaleString()}
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

export default InsuranceInfoPage;