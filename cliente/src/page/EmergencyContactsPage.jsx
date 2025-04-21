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

const EmergencyContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/emergency-contacts');
        setContacts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast({
          title: 'Error fetching emergency contacts',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchContacts();
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
      <Heading mb="6">Emergency Contacts</Heading>
      <Box overflowX="auto">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Contact ID</Th>
              <Th>Patient ID</Th>
              <Th>Patient Name</Th>
              <Th>Contact Name</Th>
              <Th>Relationship</Th>
              <Th>Phone Number</Th>
            </Tr>
          </Thead>
          <Tbody>
            {contacts.map((contact) => (
              <Tr key={contact.Contact_ID}>
                <Td>{contact.Contact_ID}</Td>
                <Td>{contact.PID}</Td>
                <Td>{`${contact.F_name} ${contact.L_name}`}</Td>
                <Td>{contact.Contact_Name}</Td>
                <Td>{contact.Relationship}</Td>
                <Td>{contact.Phone_No}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default EmergencyContactsPage;