import React, { useState, useEffect } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td,
  Box, Heading, Spinner, Alert, AlertIcon,
  useToast, Badge, Avatar, HStack, Text,
  Select, Stack
} from '@chakra-ui/react';
import axios from 'axios';

const StaffSchedulesPage = () => {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [professionFilter, setProfessionFilter] = useState('All');
  const toast = useToast();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/staff-schedules');
        setSchedules(response.data);
        setFilteredSchedules(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast({
          title: 'Error fetching staff schedules',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchSchedules();
  }, [toast]);

  useEffect(() => {
    if (professionFilter === 'All') {
      setFilteredSchedules(schedules);
    } else {
      setFilteredSchedules(
        schedules.filter(schedule => schedule.Profession === professionFilter)
      );
    }
  }, [professionFilter, schedules]);

  if (loading) return <Spinner size="xl" mt={8} />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

  const professions = [...new Set(schedules.map(s => s.Profession))];

  return (
    <Box>
      <Heading mb={6}>Staff Schedules</Heading>
      
      <Stack direction="row" mb={6} spacing={4} align="center">
        <Text>Filter by profession:</Text>
        <Select
          placeholder="All professions"
          w="300px"
          value={professionFilter}
          onChange={(e) => setProfessionFilter(e.target.value)}
        >
          <option value="All">All Professions</option>
          {professions.map(prof => (
            <option key={prof} value={prof}>{prof}</option>
          ))}
        </Select>
      </Stack>
      
      <Box overflowX="auto">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Staff</Th>
              <Th>Profession</Th>
              <Th>Shift Start</Th>
              <Th>Shift End</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredSchedules.map(schedule => (
              <Tr key={schedule.Schedule_ID}>
                <Td>
                  <HStack>
                    <Avatar name={schedule.Username} size="sm" />
                    <Text>{schedule.Username}</Text>
                  </HStack>
                </Td>
                <Td>
                  <Badge 
                    colorScheme={
                      schedule.Profession === 'Doctor' ? 'blue' : 
                      schedule.Profession === 'Nurse' ? 'purple' : 'gray'
                    }
                  >
                    {schedule.Profession}
                  </Badge>
                </Td>
                <Td>{new Date(schedule.Shift_Start).toLocaleString()}</Td>
                <Td>{new Date(schedule.Shift_End).toLocaleString()}</Td>
                <Td>
                  <Badge 
                    colorScheme={
                      new Date(schedule.Shift_Start) > new Date() ? 'yellow' :
                      new Date(schedule.Shift_End) < new Date() ? 'gray' : 'green'
                    }
                  >
                    {new Date(schedule.Shift_Start) > new Date() ? 'Upcoming' :
                     new Date(schedule.Shift_End) < new Date() ? 'Completed' : 'Active'}
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

export default StaffSchedulesPage;