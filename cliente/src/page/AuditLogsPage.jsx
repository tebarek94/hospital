import React, { useState, useEffect } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td,
  Box, Heading, Spinner, Alert, AlertIcon,
  useToast, Badge, Avatar, HStack, Text,
  Input, Stack
} from '@chakra-ui/react';
import axios from 'axios';

const AuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const toast = useToast();

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/audit-logs');
        setLogs(response.data);
        setFilteredLogs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast({
          title: 'Error fetching audit logs',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchAuditLogs();
  }, [toast]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredLogs(logs);
    } else {
      const filtered = logs.filter(log => 
        log.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.Action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.Profession.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLogs(filtered);
    }
  }, [searchTerm, logs]);

  if (loading) return <Spinner size="xl" mt={8} />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

  return (
    <Box>
      <Heading mb={6}>System Audit Logs</Heading>
      
      <Stack direction="row" mb={6} spacing={4} align="center">
        <Input
          placeholder="Search logs by user, action, or profession..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          w="500px"
        />
        <Badge colorScheme="blue" p={2} borderRadius="md">
          Total Logs: {filteredLogs.length}
        </Badge>
      </Stack>
      
      <Box overflowX="auto">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Timestamp</Th>
              <Th>User</Th>
              <Th>Profession</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredLogs.map(log => (
              <Tr key={log.Log_ID}>
                <Td>{new Date(log.Timestamp).toLocaleString()}</Td>
                <Td>
                  <HStack>
                    <Avatar name={log.Username} size="sm" />
                    <Text>{log.Username}</Text>
                  </HStack>
                </Td>
                <Td>
                  <Badge 
                    colorScheme={
                      log.Profession === 'Doctor' ? 'blue' : 
                      log.Profession === 'Nurse' ? 'purple' : 'gray'
                    }
                  >
                    {log.Profession}
                  </Badge>
                </Td>
                <Td>
                  <Text fontSize="sm" fontStyle="italic">{log.Action}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default AuditLogsPage;