import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Heading,
  useToast,
  Container,
  Flex,
  Spinner
} from '@chakra-ui/react';
import axios from 'axios';

const CreatePrescription = () => {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    medication: '',
    dosage: '',
    frequency: 'once daily',
    duration: ''
  });

  const frequencyOptions = [
    'once daily',
    'twice daily',
    'three times daily',
    'four times daily',
    'as needed',
    'every 4 hours',
    'every 6 hours',
    'every 8 hours',
    'every 12 hours',
    'weekly',
    'monthly'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post('/api/prescriptions', formData);
      
      toast({
        title: 'Prescription created.',
        description: 'The prescription has been successfully created.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form after successful submission
      setFormData({
        patient_id: '',
        doctor_id: '',
        medication: '',
        dosage: '',
        frequency: 'once daily',
        duration: ''
      });
    } catch (error) {
      toast({
        title: 'Error creating prescription.',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <Box bg="white" p={6} rounded="md" boxShadow="md">
        <Heading as="h1" size="lg" mb={6} color="teal.600">
          Create New Prescription
        </Heading>
        
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Flex w="100%" gap={4}>
              <FormControl isRequired>
                <FormLabel>Patient ID</FormLabel>
                <Input
                  name="patient_id"
                  value={formData.patient_id}
                  onChange={handleChange}
                  placeholder="Enter patient ID"
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Doctor ID</FormLabel>
                <Input
                  name="doctor_id"
                  value={formData.doctor_id}
                  onChange={handleChange}
                  placeholder="Enter doctor ID"
                />
              </FormControl>
            </Flex>
            
            <FormControl isRequired>
              <FormLabel>Medication</FormLabel>
              <Input
                name="medication"
                value={formData.medication}
                onChange={handleChange}
                placeholder="Enter medication name"
              />
            </FormControl>
            
            <Flex w="100%" gap={4}>
              <FormControl isRequired>
                <FormLabel>Dosage</FormLabel>
                <Input
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  placeholder="e.g., 500mg, 1 tablet"
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Frequency</FormLabel>
                <Select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                >
                  {frequencyOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Flex>
            
            <FormControl isRequired>
              <FormLabel>Duration</FormLabel>
              <Input
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 7 days, 2 weeks, 1 month"
              />
            </FormControl>
            
            <Button
              type="submit"
              colorScheme="teal"
              width="full"
              mt={4}
              isLoading={isSubmitting}
              loadingText="Submitting..."
              spinner={<Spinner size="sm" />}
            >
              Create Prescription
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default CreatePrescription;