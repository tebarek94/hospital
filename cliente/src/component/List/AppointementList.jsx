import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button,
  IconButton,
  useToast,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchAppointments();
  },[]);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5000/api/appointments");
      console.log(response.data);
      setAppointments(response.data.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Error fetching appointments",
        description: err.response?.data?.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      toast({
        title: "Appointment deleted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchAppointments();
    } catch (err) {
      toast({
        title: "Error deleting appointment",
        description: err.response?.data?.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    setEditModalOpen(true);
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/appointments/${selectedAppointment.id}`,
        selectedAppointment
      );
      toast({
        title: "Appointment updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setEditModalOpen(false);
      fetchAppointments();
    } catch (err) {
      toast({
        title: "Error updating appointment",
        description: err.response?.data?.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <Box mb={4} fontSize="2xl" fontWeight="bold">
        Appointments
      </Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Patient Name</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appointments.map((appointment) => (
              <Tr key={appointment.id}>
                <Td>{appointment.id}</Td>
                <Td>{appointment.patient_name}</Td>
                <Td>{appointment.date}</Td>
                <Td>{appointment.time}</Td>
                <Td>
                  <IconButton
                    icon={<EditIcon />}
                    aria-label="Edit"
                    mr={2}
                    onClick={() => handleEditClick(appointment)}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="Delete"
                    colorScheme="red"
                    onClick={() => deleteAppointment(appointment.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Appointment</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Patient Name</FormLabel>
                <Input
                  value={selectedAppointment.patient_name}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      patient_name: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  value={selectedAppointment.date}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      date: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Time</FormLabel>
                <Input
                  type="time"
                  value={selectedAppointment.time}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      time: e.target.value,
                    })
                  }
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleEditSave}
              >
                Save
              </Button>
              <Button variant="ghost" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default AppointmentsList;
