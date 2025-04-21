import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Spinner,
  Stack,
  useDisclosure
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, AddIcon } from '@chakra-ui/icons';
import axios from 'axios';

const BedInformationForm = () => {
  const [bedName, setBedName] = useState('');
  const [beds, setBeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingBed, setEditingBed] = useState(null);
  const toast = useToast();
  
  // Modal controls
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isOpen: isAlertOpen, 
    onOpen: onAlertOpen, 
    onClose: onAlertClose 
  } = useDisclosure();
  const cancelRef = React.useRef();

  // Fetch all bed information
  const fetchBeds = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/bed-information');
      setBeds(response.data.data);
    } catch (error) {
      toast({
        title: 'Error fetching bed information',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load beds on component mount
  React.useEffect(() => {
    fetchBeds();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingBed) {
        // Update existing bed
        await axios.put(`/api/bed-information/${editingBed.id}`, {
          bed_information_name: bedName
        });
        toast({
          title: 'Bed updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Create new bed
        await axios.post('/api/bed-information', {
          bed_information_name: bedName
        });
        toast({
          title: 'Bed created successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      
      // Reset form and refresh list
      setBedName('');
      setEditingBed(null);
      fetchBeds();
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

  const handleEdit = (bed) => {
    setEditingBed(bed);
    setBedName(bed.bed_information_name);
    onOpen();
  };

  const handleCreate = () => {
    setEditingBed(null);
    setBedName('');
    onOpen();
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/bed-information/${editingBed.id}`);
      toast({
        title: 'Bed deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchBeds();
    } catch (error) {
      toast({
        title: 'Error deleting bed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      onAlertClose();
    }
  };

  const confirmDelete = (bed) => {
    setEditingBed(bed);
    onAlertOpen();
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box bg="white" p={6} rounded="md" boxShadow="md">
        <Stack direction="row" justify="space-between" align="center" mb={6}>
          <Heading as="h1" size="lg">Bed Information Management</Heading>
          <Button 
            leftIcon={<AddIcon />} 
            colorScheme="teal" 
            onClick={handleCreate}
          >
            Add New Bed
          </Button>
        </Stack>

        {isLoading ? (
          <Box textAlign="center" py={10}>
            <Spinner size="xl" />
          </Box>
        ) : (
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Bed Name</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {beds.map((bed) => (
                  <Tr key={bed.id}>
                    <Td>{bed.id}</Td>
                    <Td>{bed.bed_information_name}</Td>
                    <Td>
                      <IconButton
                        icon={<EditIcon />}
                        colorScheme="blue"
                        mr={2}
                        onClick={() => handleEdit(bed)}
                        aria-label="Edit bed"
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        onClick={() => confirmDelete(bed)}
                        aria-label="Delete bed"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}

        {/* Create/Edit Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent as="form" onSubmit={handleSubmit}>
            <ModalHeader>
              {editingBed ? 'Edit Bed Information' : 'Add New Bed Information'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Bed Name</FormLabel>
                <Input
                  value={bedName}
                  onChange={(e) => setBedName(e.target.value)}
                  placeholder="Enter bed name"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button 
                colorScheme="teal" 
                mr={3} 
                type="submit"
                isLoading={isSubmitting}
              >
                {editingBed ? 'Update' : 'Save'}
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
                Delete Bed Information
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete this bed information? This action cannot be undone.
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

export default BedInformationForm;