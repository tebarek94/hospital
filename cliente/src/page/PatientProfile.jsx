import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs,
  Table, Thead, Tbody, Tr, Th, Td, Badge, Stack, Text
} from '@chakra-ui/react';
import { getPatientFullProfile } from '../services/api';

const PatientProfile = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const data = await getPatientFullProfile(id);
        setPatient(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient:', error);
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  if (loading) return <Box>Loading...</Box>;
  if (!patient) return <Box>Patient not found</Box>;

  return (
    <Box>
      <Heading mb="6">{patient.F_name} {patient.L_name}</Heading>
      
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Appointments</Tab>
          <Tab>Medical History</Tab>
          <Tab>Prescriptions</Tab>
          <Tab>Insurance</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Stack spacing="4">
              <Box>
                <Text fontWeight="bold">Personal Information</Text>
                <Text>Age: {patient.Age}</Text>
                <Text>Phone: {patient.Phone_No}</Text>
                <Text>Region: {patient.Region}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Emergency Contacts</Text>
                {patient.emergencyContacts.map(contact => (
                  <Box key={contact.Contact_ID} p="3" borderWidth="1px" borderRadius="md" mb="2">
                    <Text>{contact.Contact_Name} ({contact.Relationship})</Text>
                    <Text>{contact.Phone_No}</Text>
                  </Box>
                ))}
              </Box>
            </Stack>
          </TabPanel>

          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {patient.appointments.map(appointment => (
                  <Tr key={appointment.app_ID}>
                    <Td>{new Date(appointment.app_time).toLocaleString()}</Td>
                    <Td>
                      <Badge colorScheme={
                        appointment.Status === 'Completed' ? 'green' : 
                        appointment.Status === 'Canceled' ? 'red' : 'yellow'
                      }>
                        {appointment.Status}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>

          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Symptoms</Th>
                  <Th>Diagnosis</Th>
                </Tr>
              </Thead>
              <Tbody>
                {patient.history.map(record => (
                  <Tr key={record.History_ID}>
                    <Td>{record.Symptom}</Td>
                    <Td>{record.Disease_name}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>

          <TabPanel>
            {patient.prescriptions && patient.prescriptions.length > 0 ? (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Medication</Th>
                    <Th>Dosage</Th>
                    <Th>Duration</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {patient.prescriptions.map(prescription => (
                    <Tr key={prescription.Prescription_ID}>
                      <Td>{prescription.Prescription}</Td>
                      <Td>{prescription.details?.Dosage}</Td>
                      <Td>{prescription.details?.Duration}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Text>No prescriptions found</Text>
            )}
          </TabPanel>

          <TabPanel>
            {patient.insurance ? (
              <Box p="4" borderWidth="1px" borderRadius="md">
                <Text><strong>Provider:</strong> {patient.insurance.Insurance_Provider}</Text>
                <Text><strong>Policy Number:</strong> {patient.insurance.Policy_Number}</Text>
                <Text><strong>Coverage Amount:</strong> ${patient.insurance.Coverage_Amount}</Text>
              </Box>
            ) : (
              <Text>No insurance information available</Text>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default PatientProfile;