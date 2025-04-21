import React, { useState, useEffect } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td,
  Box, Heading, Spinner, Alert, AlertIcon,
  useToast, Text, Badge, Collapse, Button,
  Icon, Stack
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import axios from 'axios';

const PrescriptionsPage = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get('/api/hospital/prescriptions');
        setPrescriptions(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast({
          title: 'Error fetching prescriptions',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchPrescriptions();
  }, [toast]);

  const toggleRow = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter(rowId => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  if (loading) return <Spinner size="xl" mt={8} />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

  return (
    <Box>
      <Heading mb={6}>Patient Prescriptions</Heading>
      <Box overflowX="auto">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Prescription ID</Th>
              <Th>Patient</Th>
              <Th>Prescription</Th>
              <Th>Doctor</Th>
              <Th>Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {prescriptions.map(prescription => (
              <React.Fragment key={prescription.Prescription_ID}>
                <Tr>
                  <Td>{prescription.Prescription_ID}</Td>
                  <Td>{`${prescription.F_name} ${prescription.L_name}`}</Td>
                  <Td>
                    <Text noOfLines={1}>{prescription.Prescription}</Text>
                  </Td>
                  <Td>Dr. {prescription.Doctor}</Td>
                  <Td>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleRow(prescription.Prescription_ID)}
                      rightIcon={
                        <Icon as={
                          expandedRows.includes(prescription.Prescription_ID) 
                            ? ChevronUpIcon 
                            : ChevronDownIcon
                        } />
                      }
                    >
                      {expandedRows.includes(prescription.Prescription_ID) 
                        ? 'Hide' 
                        : 'Show'}
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td colSpan={5} p={0}>
                    <Collapse in={expandedRows.includes(prescription.Prescription_ID)}>
                      <Box p={4} bg="gray.50">
                        <Text fontWeight="bold">Full Prescription:</Text>
                        <Text mb={4}>{prescription.Prescription}</Text>
                        <Button
                          colorScheme="blue"
                          size="sm"
                          onClick={() => {
                            // Implement view details functionality
                          }}
                        >
                          View Medication Details
                        </Button>
                      </Box>
                    </Collapse>
                  </Td>
                </Tr>
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default PrescriptionsPage;