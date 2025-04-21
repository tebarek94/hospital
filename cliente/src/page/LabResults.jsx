import React, { useState, useEffect } from 'react';
import {
  Box, Heading, Table, Thead, Tbody, Tr, Th, Td,
  Badge, Stack, Text, Button, useDisclosure
} from '@chakra-ui/react';
import { getLabResultsWithPatients } from '../services/api';
import LabResultForm from '../component/Form/LabResultForm';

const LabResults = () => {
  const [labResults, setLabResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchLabResults = async () => {
      try {
        const data = await getLabResultsWithPatients();
        console.log('Lab results:', data);
        setLabResults(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lab results:', error);
        setLoading(false);
      }
    };
    fetchLabResults();
  }, []);

  const handleNewResult = (newResult) => {
    setLabResults([...labResults, newResult]);
  };

  return (
    <Box>
      <Heading mb="6">Laboratory Results</Heading>
      
      <Button onClick={onOpen} colorScheme="blue" mb="4">
        Add New Result
      </Button>
      
      {loading ? (
        <Box>Loading lab results...</Box>
      ) : labResults.length === 0 ? (
        <Text>No lab results found</Text>
      ) : (
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Patient</Th>
              <Th>Test Type</Th>
              <Th>Result</Th>
              <Th>Status</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {labResults.map(result => (
              <Tr key={result.Lab_ID}>
                <Td>{result.F_name} {result.L_name}</Td>
                <Td>{result.Lab_Type}</Td>
                <Td>{result.Lab_result}</Td>
                <Td>
                  <Badge 
                    colorScheme={result.Lab_result === 'Normal' ? 'green' : 'red'}
                  >
                    {result.Lab_result}
                  </Badge>
                </Td>
                <Td>{new Date(result.createdAt).toLocaleDateString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <LabResultForm 
        isOpen={isOpen} 
        onClose={onClose} 
        onSuccess={handleNewResult}
      />
    </Box>
  );
};

export default LabResults;