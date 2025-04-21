import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import axios from "axios";

const CreateDepartment = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentHead, setDepartmentHead] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!departmentName.trim()) {
      setError("Department name is required");
      return false;
    }
    if (!departmentHead.trim()) {
      setError("Department head is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage(null);
    setError(null);

    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/department", {
        department_name: departmentName,
        department_head: departmentHead,
      });
      setResponseMessage(response.data.message || "Department created successfully");
      setDepartmentName("");
      setDepartmentHead("");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An unexpected error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p={8}
      maxWidth="500px"
      mx="auto"
      mt={10}
      boxShadow="lg"
      borderRadius="md"
    >
      <Heading as="h2" size="lg" mb={6}>
        Create Department
      </Heading>
      {responseMessage && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          <AlertDescription>{responseMessage}</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <FormControl id="department_name" mb={4} isRequired>
          <FormLabel>Department Name</FormLabel>
          <Input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            placeholder="Enter department name"
          />
        </FormControl>
        <FormControl id="department_head" mb={6} isRequired>
          <FormLabel>Department Head</FormLabel>
          <Input
            type="text"
            value={departmentHead}
            onChange={(e) => setDepartmentHead(e.target.value)}
            placeholder="Enter department head"
          />
        </FormControl>
        <Button
          colorScheme="blue"
          type="submit"
          width="full"
          isLoading={loading}
          loadingText="Submitting"
        >
          Create Department
        </Button>
      </form>
    </Box>
  );
};

export default CreateDepartment;
