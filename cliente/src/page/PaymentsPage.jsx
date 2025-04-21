import React, { useState, useEffect } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td,
  Box, Heading, Spinner, Alert, AlertIcon,
  useToast, Badge, Stat, StatLabel, StatNumber
} from '@chakra-ui/react';
import axios from 'axios';

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const toast = useToast();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payments');
        setPayments(response.data);
        
        // Calculate total revenue
        const total = response.data.reduce((sum, payment) => sum + payment.Total, 0);
        setTotalRevenue(total);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast({
          title: 'Error fetching payments',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchPayments();
  }, [toast]);

  if (loading) return <Spinner size="xl" mt={8} />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

  return (
    <Box>
      <Heading mb={6}>Payment Records</Heading>
      
      <Stat mb={6} p={4} bg="green.50" borderRadius="md">
        <StatLabel>Total Revenue</StatLabel>
        <StatNumber>${totalRevenue.toLocaleString()}</StatNumber>
      </Stat>
      
      <Box overflowX="auto">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Bill ID</Th>
              <Th>Patient</Th>
              <Th>Amount</Th>
              <Th>Payment Method</Th>
            </Tr>
          </Thead>
          <Tbody>
            {payments.map(payment => (
              <Tr key={payment.Bill_ID}>
                <Td>{payment.Bill_ID}</Td>
                <Td>{`${payment.F_name} ${payment.L_name}`}</Td>
                <Td fontWeight="bold">${payment.Total.toFixed(2)}</Td>
                <Td>
                  <Badge 
                    colorScheme={payment.Pay_method === 'Cash' ? 'green' : 'blue'}
                  >
                    {payment.Pay_method}
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

export default PaymentsPage;