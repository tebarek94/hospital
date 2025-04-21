import React, { useState } from 'react';
import {
  Box, Heading, SimpleGrid, Card, CardHeader, CardBody,
  CardFooter, Text, Button, Badge, Avatar, HStack,
  Input, InputGroup, InputLeftElement, Icon, Stack
} from '@chakra-ui/react';
import { FiSearch, FiPlus, FiActivity } from 'react-icons/fi';

const PatientCare = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data - replace with real API call
  const patients = [
    { id: 1, name: 'John Doe', room: '201', status: 'Stable', lastCheck: '2 hours ago' },
    { id: 2, name: 'Jane Smith', room: '305', status: 'Critical', lastCheck: '30 mins ago' },
    { id: 3, name: 'Robert Johnson', room: '102', status: 'Recovering', lastCheck: '1 hour ago' },
    { id: 4, name: 'Emily Davis', room: '404', status: 'Stable', lastCheck: '3 hours ago' },
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.room.includes(searchTerm)
  );

  return (
    <Box p={4}>
      <Heading mb={6}>Patient Care Dashboard</Heading>
      
      <Stack direction={{ base: 'column', md: 'row' }} mb={6} spacing={4}>
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <Button leftIcon={<FiPlus />} colorScheme="blue">
          Add Patient
        </Button>
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {filteredPatients.map(patient => (
          <Card key={patient.id} variant="outline">
            <CardHeader>
              <HStack>
                <Avatar name={patient.name} />
                <Box>
                  <Text fontWeight="bold">{patient.name}</Text>
                  <Text fontSize="sm">Room: {patient.room}</Text>
                </Box>
              </HStack>
            </CardHeader>
            <CardBody>
              <HStack spacing={4}>
                <Badge
                  colorScheme={
                    patient.status === 'Critical' ? 'red' :
                    patient.status === 'Stable' ? 'green' : 'yellow'
                  }
                >
                  {patient.status}
                </Badge>
                <Text fontSize="sm">Last checked: {patient.lastCheck}</Text>
              </HStack>
            </CardBody>
            <CardFooter>
              <Button
                leftIcon={<FiActivity />}
                colorScheme="teal"
                variant="outline"
                size="sm"
              >
                Record Vitals
              </Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default PatientCare;