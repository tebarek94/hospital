import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, ModalFooter,
  FormControl, FormLabel, Input, Select,
  Button, useToast
} from '@chakra-ui/react';
import { createLabResult } from '../../services/api';

const LabResultForm = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    PID: '',
    Lab_Type: '',
    Lab_result: '',
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newResult = await createLabResult(formData);
      onSuccess(newResult);
      onClose();
      toast({
        title: 'Success',
        description: 'Lab result created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create lab result',
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
        <ModalHeader>Add New Lab Result</ModalHeader>
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
              <FormLabel>Test Type</FormLabel>
              <Select
                value={formData.Lab_Type}
                onChange={(e) => setFormData({...formData, Lab_Type: e.target.value})}
              >
                <option value="">Select test type</option>
                <option value="Blood Test">Blood Test</option>
                <option value="Urine Test">Urine Test</option>
                <option value="X-Ray">X-Ray</option>
                <option value="MRI">MRI</option>
                <option value="CT Scan">CT Scan</option>
              </Select>
            </FormControl>

            <FormControl mb="4" isRequired>
              <FormLabel>Result</FormLabel>
              <Select
                value={formData.Lab_result}
                onChange={(e) => setFormData({...formData, Lab_result: e.target.value})}
              >
                <option value="">Select result</option>
                <option value="Normal">Normal</option>
                <option value="Abnormal">Abnormal</option>
                <option value="Positive">Positive</option>
                <option value="Negative">Negative</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit" isLoading={loading}>
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default LabResultForm;