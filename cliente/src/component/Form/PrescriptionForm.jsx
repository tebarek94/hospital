import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, ModalFooter,
  FormControl, FormLabel, Input, Select,
  Button, useToast
} from '@chakra-ui/react';
import { createPrescription } from '../../services/api';

const PrescriptionForm = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    PID: '',
    Drug_ID: '',
    Dosage: '',
    Duration: '',
    Status: 'Active'
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newPrescription = await createPrescription(formData);
      onSuccess(newPrescription);
      onClose();
      toast({
        title: 'Success',
        description: 'Prescription created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create prescription',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Prescription</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl mb="4" isRequired>
              <FormLabel>Patient ID</FormLabel>
              <Input
                type="number"
                value={formData.PID}
                onChange={(e) => setFormData({...formData, PID: e.target.value})}
              />
            </FormControl>

            <FormControl mb="4" isRequired>
              <FormLabel>Medication ID</FormLabel>
              <Input
                type="number"
                value={formData.Drug_ID}
                onChange={(e) => setFormData({...formData, Drug_ID: e.target.value})}
              />
            </FormControl>

            <FormControl mb="4" isRequired>
              <FormLabel>Dosage</FormLabel>
              <Input
                value={formData.Dosage}
                onChange={(e) => setFormData({...formData, Dosage: e.target.value})}
                placeholder="e.g., 500mg"
              />
            </FormControl>

            <FormControl mb="4" isRequired>
              <FormLabel>Duration</FormLabel>
              <Input
                value={formData.Duration}
                onChange={(e) => setFormData({...formData, Duration: e.target.value})}
                placeholder="e.g., 7 days"
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Status</FormLabel>
              <Select
                value={formData.Status}
                onChange={(e) => setFormData({...formData, Status: e.target.value})}
              >
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit" isLoading={loading}>
              Save Prescription
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default PrescriptionForm;