import React, { useState, useEffect } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Table, Thead, Tbody, Tr, Th, Td, IconButton, VStack } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    phone: '',
    region: ''
  });

  // Fetch the list of patients on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/patentes')
      .then((response) => {
        setPatients(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  // Handle the deletion of a patient
  const handleDelete = (patientId) => {
    axios.delete(`http://localhost:5000/api/patentes/${patientId}`)
      .then(() => {
        setPatients(patients.filter((patient) => patient.patient_id !== patientId)); // Remove deleted patient from the state
      })
      .catch((error) => {
        console.error('Error deleting patient:', error);
      });
  };

  // Handle the addition of a new patient
  const handleAddPatient = (e) => {
    e.preventDefault();

    // Add new patient to the database
    axios.post('http://localhost:5000/api/patentes', newPatient)
      .then((response) => {
        setPatients([...patients, response.data.data]); // Add the new patient to the state
        setNewPatient({
          firstName: '',
          middleName: '',
          lastName: '',
          age: '',
          phone: '',
          region: ''
        }); // Reset the form after submission
      })
      .catch((error) => {
        console.error('Error adding patient:', error);
      });
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <form onSubmit={handleAddPatient}>
          <FormControl id="firstName">
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              value={newPatient.firstName}
              onChange={(e) => setNewPatient({ ...newPatient, firstName: e.target.value })}
              required
            />
          </FormControl>

          <FormControl id="middleName">
            <FormLabel>Middle Name</FormLabel>
            <Input
              type="text"
              value={newPatient.middleName}
              onChange={(e) => setNewPatient({ ...newPatient, middleName: e.target.value })}
            />
          </FormControl>

          <FormControl id="lastName">
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              value={newPatient.lastName}
              onChange={(e) => setNewPatient({ ...newPatient, lastName: e.target.value })}
              required
            />
          </FormControl>

          <FormControl id="age">
            <FormLabel>Age</FormLabel>
            <Input
              type="number"
              value={newPatient.age}
              onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
              required
            />
          </FormControl>

          <FormControl id="phone">
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="text"
              value={newPatient.phone}
              onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
              required
            />
          </FormControl>

          <FormControl id="region">
            <FormLabel>Region</FormLabel>
            <Input
              type="text"
              value={newPatient.region}
              onChange={(e) => setNewPatient({ ...newPatient, region: e.target.value })}
              required
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" mt={4}>
            Add Patient
          </Button>
        </form>

        {/* Patients Table */}
        <Table variant="simple" mt={6}>
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Middle Name</Th>
              <Th>Last Name</Th>
              <Th>Age</Th>
              <Th>Phone</Th>
              <Th>Region</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {patients.map((patient) => (
              <Tr key={patient.patient_id}>
                <Td>{patient.F_name}</Td>
                <Td>{patient.M_name}</Td>
                <Td>{patient.L_name}</Td>
                <Td>{patient.Age}</Td>
                <Td>{patient.Phone_No}</Td>
                <Td>{patient.Region}</Td>
                <Td>
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleDelete(patient.patient_id)}
                    aria-label="Delete Patient"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
};

export default PatientsList;
