import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Select, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';

const CreateInsuranceForm = () => {
  const [insuranceData, setInsuranceData] = useState({
    insurance_name: '',
    insurance_type: '',
    insurance_company: '',
    coverage_amount: ''
  });

  const toast = useToast(); // Chakra UI toast for notifications

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInsuranceData({ ...insuranceData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send POST request to create a new insurance
    axios.post('/api/insurance', insuranceData)
      .then(() => {
        toast({
          title: 'Insurance Created.',
          description: 'The insurance record has been successfully created.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setInsuranceData({
          insurance_name: '',
          insurance_type: '',
          insurance_company: '',
          coverage_amount: ''
        }); // Reset form after submission
      })
      .catch((error) => {
        toast({
          title: 'Error.',
          description: 'There was an error creating the insurance record.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        console.error('Error creating insurance:', error);
      });
  };

  return (
    <Box p={6} maxW="lg" borderWidth={1} borderRadius="lg">
      <VStack spacing={4} align="stretch">
        <FormControl id="insurance_name" isRequired>
          <FormLabel>Insurance Name</FormLabel>
          <Input
            type="text"
            name="insurance_name"
            value={insuranceData.insurance_name}
            onChange={handleInputChange}
            placeholder="Enter Insurance Name"
          />
        </FormControl>

        <FormControl id="insurance_type" isRequired>
          <FormLabel>Insurance Type</FormLabel>
          <Select
            name="insurance_type"
            value={insuranceData.insurance_type}
            onChange={handleInputChange}
            placeholder="Select Insurance Type"
          >
            <option value="Health">Health</option>
            <option value="Life">Life</option>
            <option value="Auto">Auto</option>
            <option value="Home">Home</option>
          </Select>
        </FormControl>

        <FormControl id="insurance_company" isRequired>
          <FormLabel>Insurance Company</FormLabel>
          <Input
            type="text"
            name="insurance_company"
            value={insuranceData.insurance_company}
            onChange={handleInputChange}
            placeholder="Enter Insurance Company Name"
          />
        </FormControl>

        <FormControl id="coverage_amount" isRequired>
          <FormLabel>Coverage Amount</FormLabel>
          <Input
            type="number"
            name="coverage_amount"
            value={insuranceData.coverage_amount}
            onChange={handleInputChange}
            placeholder="Enter Coverage Amount"
          />
        </FormControl>

        <Button colorScheme="blue" onClick={handleSubmit} mt={4}>
          Create Insurance
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateInsuranceForm;
