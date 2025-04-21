import React, { useState } from 'react';
import {
  Box, Heading, Table, Thead, Tbody, Tr, Th, Td,
  Input, InputGroup, InputLeftElement, Badge, Button,
  Icon, Stack, Text, useDisclosure, HStack
} from '@chakra-ui/react';
import { FiSearch, FiDollarSign, FiPrinter } from 'react-icons/fi';

const ReceptionistBilling = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBill, setSelectedBill] = useState(null);
  
  // Sample data - replace with real API call
  const bills = [
    { id: 1, patient: 'John Doe', date: '2023-05-15', amount: 250.75, status: 'Paid' },
    { id: 2, patient: 'Jane Smith', date: '2023-05-16', amount: 180.50, status: 'Pending' },
    { id: 3, patient: 'Robert Johnson', date: '2023-05-17', amount: 420.00, status: 'Pending' },
    { id: 4, patient: 'Emily Davis', date: '2023-05-18', amount: 95.25, status: 'Paid' },
  ];

  const filteredBills = bills.filter(bill =>
    bill.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProcessPayment = (bill) => {
    setSelectedBill(bill);
    onOpen();
  };

  return (
    <Box p={4}>
      <Heading mb={6}>Billing Management</Heading>
      
      <Stack direction={{ base: 'column', md: 'row' }} mb={6} spacing={4}>
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search bills..."
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
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredBills.map(bill => (
              <Tr key={bill.id}>
                <Td>{bill.patient}</Td>
                <Td>{bill.date}</Td>
                <Td>${bill.amount.toFixed(2)}</Td>
                <Td>
                  <Badge colorScheme={bill.status === 'Paid' ? 'green' : 'orange'}>
                    {bill.status}
                  </Badge>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      leftIcon={<FiDollarSign />}
                      isDisabled={bill.status === 'Paid'}
                      onClick={() => handleProcessPayment(bill)}
                    >
                      Process
                    </Button>
                    <Button size="sm" leftIcon={<FiPrinter />} variant="outline">
                      Print
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {selectedBill && (
        <PaymentModal
          isOpen={isOpen}
          onClose={onClose}
          bill={selectedBill}
        />
      )}
    </Box>
  );
};

export default ReceptionistBilling;