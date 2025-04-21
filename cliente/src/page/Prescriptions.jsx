import React, { useState, useEffect } from 'react';
import {
  Box, Heading, Table, Thead, Tbody, Tr, Th, Td,
  Badge, Button, useDisclosure, Stack, Text
} from '@chakra-ui/react';
import { getPrescriptionsWithDetails } from '../services/api';
import PrescriptionForm from '../component/Form/PrescriptionForm';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const data = await getPrescriptionsWithDetails();
        setPrescriptions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
        setLoading(false);
      }
    };
    fetchPrescriptions();
  }, []);

  const handleNewPrescription = (newPrescription) => {
    setPrescriptions([...prescriptions, newPrescription]);
  };

  return (
    <Box>
      <Heading mb="6">Prescriptions</Heading>
      
      <Button onClick={onOpen} colorScheme="blue" mb="4">
        Add New Prescription
      </Button>
      
      {loading ? (
        <Box>Loading prescriptions...</Box>
      ) : prescriptions.length === 0 ? (
        <Text>No prescriptions found</Text>
      ) : (
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Patient</Th>
              <Th>Medication</Th>
              <Th>Dosage</Th>
              <Th>Duration</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {prescriptions.map(prescription => (
              <Tr key={prescription.Prescription_ID}>
                <Td>{prescription.F_name} {prescription.L_name}</Td>
                <Td>{prescription.Drug_Name}</Td>
                <Td>{prescription.Dosage}</Td>
                <Td>{prescription.Duration}</Td>
                <Td>
                  <Badge colorScheme={prescription.Status === 'Active' ? 'green' : 'red'}>
                    {prescription.Status}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <PrescriptionForm 
        isOpen={isOpen} 
        onClose={onClose} 
        onSuccess={handleNewPrescription}
      />
    </Box>
  );
};

export default Prescriptions;