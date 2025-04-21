import React, { useState, useEffect } from 'react';
import { Button, Input, FormControl, FormLabel, Box, Text } from '@chakra-ui/react';
import axios from 'axios';

const EmergencyContactDetails = ({ emergencyContactId }) => {
  const [emergencyContact, setEmergencyContact] = useState(null);
  const [updatedContact, setUpdatedContact] = useState({
    emergency_contact_name: '',
    emergency_contact_number: '',
    relationship: ''
  });

  // Fetch emergency contact details on component mount
  useEffect(() => {
    axios.get(`http://localhost:5000/api/emergencycontact/${emergencyContactId}`)
      .then(response => {
        setEmergencyContact(response.data.data[0]);
        console.log(response.data.data[0]);
        setUpdatedContact({
          emergency_contact_name: response.data.data[0].emergency_contact_name,
          emergency_contact_number: response.data.data[0].emergency_contact_number,
          relationship: response.data.data[0].relationship
        });
      })
      .catch((err)=>{
        console.log(err);
      });
  }, [emergencyContactId]);

  // Handle delete action
  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/emergency-contact/${emergencyContactId}`)
      .then(() => {
        alert('Emergency contact deleted');
        // Optionally redirect to another page
      })
      .catch(error => console.error('Error deleting contact:', error));
  };

  // Handle edit form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/emergency-contact/${emergencyContactId}`, updatedContact)
      .then(() => {
        alert('Emergency contact updated');
        setEmergencyContact(updatedContact);
      })
      .catch(error => console.error('Error updating contact:', error));
  };

  return (
    <Box p={4}>
      {emergencyContact && (
        <>
          <Text fontSize="xl">Emergency Contact Details</Text>
          <FormControl id="emergency_contact_name">
            <FormLabel>Name</FormLabel>
            <Input
              value={updatedContact.emergency_contact_name}
              onChange={(e) => setUpdatedContact({ ...updatedContact, emergency_contact_name: e.target.value })}
            />
          </FormControl>

          <FormControl id="emergency_contact_number">
            <FormLabel>Phone Number</FormLabel>
            <Input
              value={updatedContact.emergency_contact_number}
              onChange={(e) => setUpdatedContact({ ...updatedContact, emergency_contact_number: e.target.value })}
            />
          </FormControl>

          <FormControl id="relationship">
            <FormLabel>Relationship</FormLabel>
            <Input
              value={updatedContact.relationship}
              onChange={(e) => setUpdatedContact({ ...updatedContact, relationship: e.target.value })}
            />
          </FormControl>

          <Button colorScheme="blue" onClick={handleSubmit}>Update</Button>
          <Button colorScheme="red" onClick={handleDelete} ml={4}>Delete</Button>
        </>
      )}
    </Box>
  );
};

export default EmergencyContactDetails;
