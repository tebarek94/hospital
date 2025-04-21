import React, { useState, useEffect } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td,
  Box, Heading, Spinner, Alert, AlertIcon,
  useToast, Badge, Stack
} from '@chakra-ui/react';
import axios from 'axios';

const PatientHistoryPage = () => {
  const [patientHistory, setPatientHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchPatientHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patient-history');
        setPatientHistory(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast({
          title: 'Error fetching patient history',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchPatientHistory();
  }, [toast]);

  if (loading) return <Spinner size="xl" mt={8} />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

  return (
    <Box>
      <Heading mb={6}>Patient Medical History</Heading>
      <Box overflowX="auto">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>History ID</Th>
              <Th>Patient</Th>
              <Th>Symptoms</Th>
              <Th>Diagnosis</Th>
              <Th>Medical Team</Th>
            </Tr>
          </Thead>
          <Tbody>
            {patientHistory.map(history => (
              <Tr key={history.History_ID}>
                <Td>{history.History_ID}</Td>
                <Td>{`${history.F_name} ${history.L_name}`}</Td>
                <Td>{history.Symptom}</Td>
                <Td>
                  <Badge colorScheme="purple">{history.Disease_name}</Badge>
                </Td>
                <Td>
                  <Stack spacing={1}>
                    <Text>Dr. {history.Doctor}</Text>
                    {history.Nurse && <Text fontSize="sm">Nurse: {history.Nurse}</Text>}
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default PatientHistoryPage;