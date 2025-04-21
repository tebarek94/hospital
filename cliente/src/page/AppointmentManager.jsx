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
import useAppointment from "../hooks/useAppointement";

const AppointmentManager = () => {
  const {
    appointments,
    loading,
    error,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  } = useAppointment();

  const [newAppointment, setNewAppointment] = useState({
    PID: "",
    F_name: "",
    L_name: "",
    app_time: "",
    Status: "",
  });

  const toast = useToast();

  const handleAdd = () => {
    addAppointment(newAppointment);
    setNewAppointment({ PID: "", F_name: "", L_name: "", app_time: "", Status: "" });
    toast({
      title: "Appointment added.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdate = (id) => {
    updateAppointment(id, newAppointment);
    toast({
      title: "Appointment updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDelete = (id) => {
    deleteAppointment(id);
    toast({
      title: "Appointment deleted.",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={6}>
      <Box mb={6} fontSize="xl" fontWeight="bold">
        Appointment Records
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
            <Th>App ID</Th>
            <Th>Patient ID</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Appointment Time</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
  {(appointments || []).map((record) => (
    <Tr key={record.app_ID}>
      <Td>{record.app_ID}</Td>
      <Td>{record.PID}</Td>
      <Td>{record.F_name}</Td>
      <Td>{record.L_name}</Td>
      <Td>{new Date(record.app_time).toLocaleString()}</Td>
      <Td>{record.Status}</Td>
      <Td>
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => handleUpdate(record.app_ID)}
        >
          Edit
        </Button>
        <Button
          colorScheme="red"
          size="sm"
          ml={2}
          onClick={() => handleDelete(record.app_ID)}
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
          value={newAppointment.PID}
          onChange={(e) => setNewAppointment({ ...newAppointment, PID: e.target.value })}
          mb={2}
        />
        <Input
          placeholder="First Name"
          value={newAppointment.F_name}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, F_name: e.target.value })
          }
          mb={2}
        />
        <Input
          placeholder="Last Name"
          value={newAppointment.L_name}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, L_name: e.target.value })
          }
          mb={2}
        />
        <Input
          placeholder="Appointment Time"
          value={newAppointment.app_time}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, app_time: e.target.value })
          }
          mb={2}
        />
        <Input
          placeholder="Status"
          value={newAppointment.Status}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, Status: e.target.value })
          }
          mb={4}
        />
        <Button colorScheme="teal" onClick={handleAdd}>
          Add Appointment
        </Button>
      </Box>
    </Box>
  );
};

export default AppointmentManager;
