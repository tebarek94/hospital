import React, { useEffect, useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, useToast, IconButton } from '@chakra-ui/react';
import axios from 'axios';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const InsuranceList = () => {
  const [insuranceList, setInsuranceList] = useState([]);
  const toast = useToast();

  // Fetch all insurance records from the backend
  const fetchInsurance = () => {
    axios.get('http://localhost:5000/api/insurance')
      .then((response) => {
        setInsuranceList(response.data.data);
      })
      .catch(() => {
        toast({
          title: 'Error fetching insurance records.',
          description: 'Unable to load the insurance records.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    fetchInsurance();
  },);

  // Handle Delete insurance action
  const handleDelete = (insurance_id) => {
    axios.delete(`/api/insurance/${insurance_id}`)
      .then(() => {
        toast({
          title: 'Insurance Deleted.',
          description: 'The insurance record has been successfully deleted.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        // Re-fetch the insurance list after deletion
        fetchInsurance();
      })
      .catch(() => {
        toast({
          title: 'Error deleting insurance.',
          description: 'There was an issue deleting the insurance record.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleEdit = (insurance_id) => {
    // Implement edit functionality (this could open a modal or navigate to an edit form)
    console.log(`Edit insurance with id: ${insurance_id}`);
  };

  return (
    <Box p={6} maxW="full">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Insurance Name</Th>
            <Th>Insurance Type</Th>
            <Th>Insurance Company</Th>
            <Th>Coverage Amount</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {insuranceList.map((insurance) => (
            <Tr key={insurance.insurance_id}>
              <Td>{insurance.insurance_name}</Td>
              <Td>{insurance.insurance_type}</Td>
              <Td>{insurance.insurance_company}</Td>
              <Td>{insurance.coverage_amount}</Td>
              <Td>
                <Button 
                  leftIcon={<FiEdit />} 
                  colorScheme="yellow" 
                  onClick={() => handleEdit(insurance.insurance_id)} 
                  mr={2}
                >
                  Edit
                </Button>
                <IconButton 
                  icon={<FiTrash2 />} 
                  colorScheme="red" 
                  onClick={() => handleDelete(insurance.insurance_id)} 
                  aria-label="Delete" 
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InsuranceList;
