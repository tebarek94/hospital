import React, { useState, useEffect } from 'react';
import {
  Box, Heading, Table, Thead, Tbody, Tr, Th, Td,
  Badge, Select, Stack, Text
} from '@chakra-ui/react';
import { getAppointmentsWithDoctors } from '../services/api';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointmentsWithDoctors();
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const filteredAppointments = filter === 'all' 
    ? appointments 
    : appointments.filter(app => app.Status === filter);

  return (
    <Box>
      <Heading mb="6">Appointments</Heading>
      
      <Stack direction="row" mb="6" align="center">
        <Text>Filter by status:</Text>
        <Select 
          width="200px" 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Canceled">Canceled</option>
        </Select>
      </Stack>

      {loading ? (
        <Box>Loading appointments...</Box>
      ) : (
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Patient</Th>
              <Th>Doctor</Th>
              <Th>Date & Time</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredAppointments.map(appointment => (
              <Tr key={appointment.app_ID}>
                <Td>{appointment.patient_fname} {appointment.patient_lname}</Td>
                <Td>{appointment.doctor_name || 'Not assigned'}</Td>
                <Td>{new Date(appointment.app_time).toLocaleString()}</Td>
                <Td>
                  <Badge 
                    colorScheme={
                      appointment.Status === 'Completed' ? 'green' : 
                      appointment.Status === 'Canceled' ? 'red' : 'yellow'
                    }
                  >
                    {appointment.Status}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Appointments;