import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import useEmergencyContact from "../hooks/useEmergencyContact";

const EmergencyContactList = () => {
  const {
    emergencyContact,
    loading,
    error,
    addEmergencyContact,
    deleteEmergencyContact,
  } = useEmergencyContact();

  const [newContact, setNewContact] = useState({
    PID: "",
    F_name: "",
    L_name: "",
    Contact_Name: "",
    Relationship: "",
    Phone_No: "",
  });

  const toast = useToast();

  const handleAdd = () => {
    addEmergencyContact(newContact);
    setNewContact({
      PID: "",
      F_name: "",
      L_name: "",
      Contact_Name: "",
      Relationship: "",
      Phone_No: "",
    });
    toast({
      title: "Contact added successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDelete = (id) => {
    deleteEmergencyContact(id);
    toast({
      title: "Contact deleted.",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={6}>
      <Box mb={6} fontSize="xl" fontWeight="bold">
        Emergency Contacts
      </Box>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Contact ID</Th>
            <Th>Patient ID</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Contact Name</Th>
            <Th>Relationship</Th>
            <Th>Phone No</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {emergencyContact.map((contact) => (
            <Tr key={contact.Contact_ID}>
              <Td>{contact.Contact_ID}</Td>
              <Td>{contact.PID}</Td>
              <Td>{contact.F_name}</Td>
              <Td>{contact.L_name}</Td>
              <Td>{contact.Contact_Name}</Td>
              <Td>{contact.Relationship}</Td>
              <Td>{contact.Phone_No}</Td>
              <Td>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(contact.Contact_ID)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box mt={6}>
        <Input
          placeholder="Patient ID"
          value={newContact.PID}
          onChange={(e) => setNewContact({ ...newContact, PID: e.target.value })}
          mb={2}
        />
        <Input
          placeholder="First Name"
          value={newContact.F_name}
          onChange={(e) => setNewContact({ ...newContact, F_name: e.target.value })}
          mb={2}
        />
        <Input
          placeholder="Last Name"
          value={newContact.L_name}
          onChange={(e) => setNewContact({ ...newContact, L_name: e.target.value })}
          mb={2}
        />
        <Input
          placeholder="Contact Name"
          value={newContact.Contact_Name}
          onChange={(e) => setNewContact({ ...newContact, Contact_Name: e.target.value })}
          mb={2}
        />
        <Input
          placeholder="Relationship"
          value={newContact.Relationship}
          onChange={(e) => setNewContact({ ...newContact, Relationship: e.target.value })}
          mb={2}
        />
        <Input
          placeholder="Phone No"
          value={newContact.Phone_No}
          onChange={(e) => setNewContact({ ...newContact, Phone_No: e.target.value })}
          mb={4}
        />
        <Button colorScheme="teal" onClick={handleAdd}>
          Add Contact
        </Button>
      </Box>
    </Box>
  );
};

export default EmergencyContactList;
