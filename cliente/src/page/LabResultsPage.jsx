import React, { useState, useEffect } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td,
  Box, Heading, Spinner, Alert, AlertIcon,
  useToast, Tag, Text
} from '@chakra-ui/react';
import axios from 'axios';

const LabResultsPage = () => {
  const [labResults, setLabResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchLabResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/lab-results');
        setLabResults(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast({
          title: 'Error fetching lab results',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchLabResults();
  }, [toast]);

  if (loading) return <Spinner size="xl" mt={8} />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

  return (
    <Box>
      <Heading mb={6}>Laboratory Results</Heading>
      <Box overflowX="auto">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Lab ID</Th>
              <Th>Patient</Th>
              <Th>Test Type</Th>
              <Th>Result</Th>
            </Tr>
          </Thead>
          <Tbody>
            {labResults.map(lab => (
              <Tr key={lab.Lab_ID}>
                <Td>{lab.Lab_ID}</Td>
                <Td>{`${lab.F_name} ${lab.L_name}`}</Td>
                <Td>
                  <Tag colorScheme="blue">{lab.Lab_Type}</Tag>
                </Td>
                <Td>
                  <Text fontWeight="bold" color={lab.Lab_result.includes('Abnormal') ? 'red.500' : 'green.500'}>
                    {lab.Lab_result}
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default LabResultsPage;