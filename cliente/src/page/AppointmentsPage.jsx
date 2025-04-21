import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments');
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast({
          title: 'Error fetching appointments',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchAppointments();
  }, [toast]);

  if (loading) {
    return (
      <Box textAlign="center" mt="8">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" mt="4">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Heading mb="6">Appointments</Heading>
      <Box overflowX="auto">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Patient ID</Th>
              <Th>Patient Name</Th>
              <Th>Appointment Time</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appointments.map((appointment) => (
              <Tr key={appointment.app_ID}>
                <Td>{appointment.app_ID}</Td>
                <Td>{appointment.PID}</Td>
                <Td>{`${appointment.F_name} ${appointment.L_name}`}</Td>
                <Td>{new Date(appointment.app_time).toLocaleString()}</Td>
                <Td>{appointment.Status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default AppointmentsPage;