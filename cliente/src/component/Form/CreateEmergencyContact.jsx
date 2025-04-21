import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const CreateEmergencyContact = () => {
  const [formData, setFormData] = useState({
    emergency_contact_name: "",
    emergency_contact_number: "",
    relationship: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/emergency-contact",
        formData
      );

      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Clear the form
      setFormData({
        emergency_contact_name: "",
        emergency_contact_number: "",
        relationship: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "An error occurred while creating the contact.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt={8}
      p={6}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="lg"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="emergency_contact_name" isRequired>
            <FormLabel>Contact Name</FormLabel>
            <Input
              type="text"
              name="emergency_contact_name"
              value={formData.emergency_contact_name}
              onChange={handleChange}
              placeholder="Enter contact name"
            />
          </FormControl>
          <FormControl id="emergency_contact_number" isRequired>
            <FormLabel>Contact Number</FormLabel>
            <Input
              type="text"
              name="emergency_contact_number"
              value={formData.emergency_contact_number}
              onChange={handleChange}
              placeholder="Enter contact number"
            />
          </FormControl>
          <FormControl id="relationship" isRequired>
            <FormLabel>Relationship</FormLabel>
            <Input
              type="text"
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              placeholder="Enter relationship"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isSubmitting}
            loadingText="Submitting"
          >
            Create Contact
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreateEmergencyContact;
