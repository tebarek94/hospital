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
  Flex,
} from "@chakra-ui/react";
import usePayment from "../hooks/usePayment";

const PaymentManager = () => {
  const { payments, loading, error, addPayment, updatePayment, deletePayment } =
    usePayment();

  const [newPayment, setNewPayment] = useState({
    PID: "",
    F_name: "",
    L_name: "",
    Total: "",
    Pay_method: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    addPayment(newPayment);
    setNewPayment({
      PID: "",
      F_name: "",
      L_name: "",
      Total: "",
      Pay_method: "",
    });
  };

  const handleEdit = (id, updatedData) => {
    updatePayment(id, updatedData);
  };

  const handleDelete = (id) => {
    deletePayment(id);
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
        {error}
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
            value={newPayment.PID}
            onChange={handleInputChange}
            placeholder="Enter Patient ID"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>First Name</FormLabel>
          <Input
            name="F_name"
            value={newPayment.F_name}
            onChange={handleInputChange}
            placeholder="Enter First Name"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Last Name</FormLabel>
          <Input
            name="L_name"
            value={newPayment.L_name}
            onChange={handleInputChange}
            placeholder="Enter Last Name"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Total</FormLabel>
          <Input
            name="Total"
            value={newPayment.Total}
            onChange={handleInputChange}
            placeholder="Enter Total Amount"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Payment Method</FormLabel>
          <Input
            name="Pay_method"
            value={newPayment.Pay_method}
            onChange={handleInputChange}
            placeholder="Enter Payment Method"
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleAdd}>
          Add Payment
        </Button>
      </Box>

      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Bill ID</Th>
            <Th>Patient ID</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Total</Th>
            <Th>Payment Method</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {payments.map((payment) => (
            <Tr key={payment.Bill_ID}>
              <Td>{payment.Bill_ID}</Td>
              <Td>{payment.PID}</Td>
              <Td>{payment.F_name}</Td>
              <Td>{payment.L_name}</Td>
              <Td>{payment.Total}</Td>
              <Td>{payment.Pay_method}</Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="yellow"
                  onClick={() =>
                    handleEdit(payment.Bill_ID, {
                      ...payment,
                      Total: "300.00",
                    })
                  }
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  ml={2}
                  onClick={() => handleDelete(payment.Bill_ID)}
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

export default PaymentManager;
