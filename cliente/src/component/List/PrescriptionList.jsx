import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Container,
  Heading,
  Stack,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Spinner
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import axios from 'axios';

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPrescription, setCurrentPrescription] = useState(null);
  const toast = useToast();
  
  // Modal controls
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isOpen: isAlertOpen, 
    onOpen: onAlertOpen, 
    onClose: onAlertClose 
  } = useDisclosure();
  const cancelRef = React.useRef();

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

  // Form state
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    medication: '',
    dosage: '',
    frequency: 'once daily',
    duration: ''
  });

  // Fetch all prescriptions
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/prescriptions');
        setPrescriptions(response.data.data);
      } catch (error) {
        toast({
          title: 'Error fetching prescriptions',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPrescriptions();
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Open modal for editing
  const handleEdit = (prescription) => {
    setCurrentPrescription(prescription);
    setFormData({
      patient_id: prescription.patient_id,
      doctor_id: prescription.doctor_id,
      medication: prescription.medication,
      dosage: prescription.dosage,
      frequency: prescription.frequency,
      duration: prescription.duration
    });
    onOpen();
  };

  // Open modal for creating new
  const handleCreate = () => {
    setCurrentPrescription(null);
    setFormData({
      patient_id: '',
      doctor_id: '',
      medication: '',
      dosage: '',
      frequency: 'once daily',
      duration: ''
    });
    onOpen();
  };

  // Submit form (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (currentPrescription) {
        // Update existing
        await axios.put(`http://localhost:5000/api/prescriptions/${currentPrescription.id}`, formData);
        toast({
          title: 'Prescription updated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Create new
        await axios.post('http://localhost:5000/api/prescriptions', formData);
        toast({
          title: 'Prescription created.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      
      // Refresh list
      const response = await axios.get('http://localhost:5000/api/prescriptions');
      setPrescriptions(response.data.data);
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/prescriptions/${currentPrescription.id}`);
      toast({
        title: 'Prescription deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Refresh list
      const response = await axios.get('/api/prescriptions');
      setPrescriptions(response.data.data);
    } catch (error) {
      toast({
        title: 'Error deleting prescription',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      onAlertClose();
    }
  };

  // Open delete confirmation
  const confirmDelete = (prescription) => {
    setCurrentPrescription(prescription);
    onAlertOpen();
  };

  if (isLoading) {
    return (
      <Container centerContent mt={10}>
        <Spinner size="xl" />
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Box bg="white" p={6} rounded="md" boxShadow="md">
        <Stack direction="row" justify="space-between" align="center" mb={6}>
          <Heading as="h1" size="lg">Prescription Management</Heading>
          <Button 
            leftIcon={<AddIcon />} 
            colorScheme="teal" 
            onClick={handleCreate}
          >
            Add Prescription
          </Button>
        </Stack>

        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Patient ID</Th>
                <Th>Doctor ID</Th>
                <Th>Medication</Th>
                <Th>Dosage</Th>
                <Th>Frequency</Th>
                <Th>Duration</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {prescriptions.map((prescription) => (
                <Tr key={prescription.id}>
                  <Td>{prescription.id}</Td>
                  <Td>{prescription.patient_id}</Td>
                  <Td>{prescription.doctor_id}</Td>
                  <Td>{prescription.medication}</Td>
                  <Td>{prescription.dosage}</Td>
                  <Td>{prescription.frequency}</Td>
                  <Td>{prescription.duration}</Td>
                  <Td>
                    <IconButton
                      icon={<EditIcon />}
                      colorScheme="blue"
                      mr={2}
                      onClick={() => handleEdit(prescription)}
                      aria-label="Edit prescription"
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={() => confirmDelete(prescription)}
                      aria-label="Delete prescription"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Create/Edit Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent as="form" onSubmit={handleSubmit}>
            <ModalHeader>
              {currentPrescription ? 'Edit Prescription' : 'Create New Prescription'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Patient ID</FormLabel>
                  <Input
                    name="patient_id"
                    value={formData.patient_id}
                    onChange={handleInputChange}
                    placeholder="Enter patient ID"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Doctor ID</FormLabel>
                  <Input
                    name="doctor_id"
                    value={formData.doctor_id}
                    onChange={handleInputChange}
                    placeholder="Enter doctor ID"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Medication</FormLabel>
                  <Input
                    name="medication"
                    value={formData.medication}
                    onChange={handleInputChange}
                    placeholder="Enter medication name"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Dosage</FormLabel>
                  <Input
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleInputChange}
                    placeholder="e.g., 500mg, 1 tablet"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Frequency</FormLabel>
                  <Select
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleInputChange}
                  >
                    {frequencyOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Duration</FormLabel>
                  <Input
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 7 days, 2 weeks, 1 month"
                  />
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button 
                colorScheme="teal" 
                mr={3} 
                type="submit"
                isLoading={isSubmitting}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          isOpen={isAlertOpen}
          leastDestructiveRef={cancelRef}
          onClose={onAlertClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Prescription
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete this prescription? This action cannot be undone.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onAlertClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </Container>
  );
};

export default PrescriptionList;