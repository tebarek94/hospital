import React, { useState } from 'react';
import {
  Box, Heading, Table, Thead, Tbody, Tr, Th, Td,
  Input, InputGroup, InputLeftElement, Badge,
  useDisclosure, Button, Icon, Stack, Text
} from '@chakra-ui/react';
import { FiSearch, FiFileText } from 'react-icons/fi';

const DoctorRecords = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  
  // Sample data - replace with real API call
  const records = [
    { id: 1, patient: 'John Doe', date: '2023-05-15', diagnosis: 'Hypertension', status: 'Active' },
    { id: 2, patient: 'Jane Smith', date: '2023-05-10', diagnosis: 'Diabetes', status: 'Active' },
    { id: 3, patient: 'Robert Johnson', date: '2023-05-05', diagnosis: 'Asthma', status: 'Archived' },
    { id: 4, patient: 'Emily Davis', date: '2023-04-28', diagnosis: 'Migraine', status: 'Active' },
  ];

  const filteredRecords = records.filter(record =>
    record.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    onOpen();
  };

  return (
    <Box p={4}>
      <Heading mb={6}>Patient Medical Records</Heading>
      
      <Stack direction={{ base: 'column', md: 'row' }} mb={6} spacing={4}>
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Stack>

      <Box overflowX="auto">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Patient</Th>
              <Th>Date</Th>
              <Th>Diagnosis</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredRecords.map(record => (
              <Tr key={record.id}>
                <Td>{record.patient}</Td>
                <Td>{record.date}</Td>
                <Td>{record.diagnosis}</Td>
                <Td>
                  <Badge colorScheme={record.status === 'Active' ? 'green' : 'gray'}>
                    {record.status}
                  </Badge>
                </Td>
                <Td>
                  <Button
                    size="sm"
                    leftIcon={<FiFileText />}
                    onClick={() => handleViewRecord(record)}
                  >
                    View
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {selectedRecord && (
        <PatientRecordModal
          isOpen={isOpen}
          onClose={onClose}
          record={selectedRecord}
        />
      )}
    </Box>
  );
};

export default DoctorRecords;