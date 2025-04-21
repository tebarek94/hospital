import React from 'react';
import {
  Box,
  Spinner,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Alert,
  AlertIcon,
  Heading,
} from '@chakra-ui/react';
import usePrescription from '../hooks/usePrescription';

function PrescriptionList() {
  const { prescription, loading, error } = usePrescription();

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading prescriptions...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={10}>
        <Alert status="error">
          <AlertIcon />
          Error fetching prescriptions: {error.message}
        </Alert>
      </Box>
    );
  }

  return (
    <Box mt={10} p={5} borderWidth="1px" borderRadius="lg" boxShadow="md" overflowX="auto">
      <Heading as="h2" size="lg" mb={5}>
        Prescriptions
      </Heading>
      <Table variant="striped" colorScheme="teal" size="sm">
        <Thead>
          <Tr>
            <Th>Prescription ID</Th>
            <Th>Patient ID</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Prescription</Th>
            <Th>Doctor</Th>
          </Tr>
        </Thead>
        <Tbody>
          {prescription.map((pres) => (
            <Tr key={pres.Prescription_ID}>
              <Td>{pres.Prescription_ID}</Td>
              <Td>{pres.PID}</Td>
              <Td>{pres.F_name}</Td>
              <Td>{pres.L_name}</Td>
              <Td>{pres.Prescription}</Td>
              <Td>{pres.Doctor}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default PrescriptionList;
