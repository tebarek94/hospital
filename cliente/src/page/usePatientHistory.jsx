import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
} from "@chakra-ui/react";
import usePatientHistory from "../hooks/usePatientHistory";

const PatientHistory = () => {
  const {
    patientHistory,
    loading,
    error,
    addPatientHistory,
    updatePatientHistory,
    deletePatientHistory,
  } = usePatientHistory();

  const [newHistory, setNewHistory] = useState({
    PID: "",
    F_name: "",
    L_name: "",
    Symptom: "",
    Disease_name: "",
    Doctor: "",
    Nurse: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHistory((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    addPatientHistory(newHistory);
    setNewHistory({
      PID: "",
      F_name: "",
      L_name: "",
      Symptom: "",
      Disease_name: "",
      Doctor: "",
      Nurse: "",
    });
  };

  const handleEdit = (id, updatedData) => {
    updatePatientHistory(id, updatedData);
  };

  const handleDelete = (id) => {
    deletePatientHistory(id);
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <Box>
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Box>
      </Alert>
    );
  }

  return (
    <Box p={6}>
      <Box mb={6}>
        <FormControl mb={4}>
          <FormLabel>Patient ID</FormLabel>
          <Input
            name="PID"
            value={newHistory.PID}
            onChange={handleInputChange}
            placeholder="Enter Patient ID"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>First Name</FormLabel>
          <Input
            name="F_name"
            value={newHistory.F_name}
            onChange={handleInputChange}
            placeholder="Enter First Name"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Last Name</FormLabel>
          <Input
            name="L_name"
            value={newHistory.L_name}
            onChange={handleInputChange}
            placeholder="Enter Last Name"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Symptoms</FormLabel>
          <Input
            name="Symptom"
            value={newHistory.Symptom}
            onChange={handleInputChange}
            placeholder="Enter Symptoms"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Disease Name</FormLabel>
          <Input
            name="Disease_name"
            value={newHistory.Disease_name}
            onChange={handleInputChange}
            placeholder="Enter Disease Name"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Doctor</FormLabel>
          <Input
            name="Doctor"
            value={newHistory.Doctor}
            onChange={handleInputChange}
            placeholder="Enter Doctor Name"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Nurse</FormLabel>
          <Input
            name="Nurse"
            value={newHistory.Nurse}
            onChange={handleInputChange}
            placeholder="Enter Nurse Name"
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleAdd}>
          Add Patient History
        </Button>
      </Box>

      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>History ID</Th>
            <Th>Patient ID</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Symptoms</Th>
            <Th>Disease Name</Th>
            <Th>Doctor</Th>
            <Th>Nurse</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {patientHistory.map((history) => (
            <Tr key={history.History_ID}>
              <Td>{history.History_ID}</Td>
              <Td>{history.PID}</Td>
              <Td>{history.F_name}</Td>
              <Td>{history.L_name}</Td>
              <Td>{history.Symptom}</Td>
              <Td>{history.Disease_name}</Td>
              <Td>{history.Doctor}</Td>
              <Td>{history.Nurse}</Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="yellow"
                  onClick={() =>
                    handleEdit(history.History_ID, {
                      ...history,
                      Disease_name: "Updated Disease",
                    })
                  }
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  ml={2}
                  onClick={() => handleDelete(history.History_ID)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PatientHistory;
