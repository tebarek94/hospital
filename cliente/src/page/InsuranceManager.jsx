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
} from "@chakra-ui/react";
import useInsurance from "../hooks/useInshuranc";

const InsuranceManager = () => {
  const { insurance, loading, error, addInsurance, updateInsurance, deleteInsurance } =
    useInsurance();

  const [newInsurance, setNewInsurance] = useState({
    PID: "",
    F_name: "",
    L_name: "",
    Insurance_Provider: "",
    Policy_Number: "",
    Coverage_Amount: "",
  });

  const handleAdd = () => {
    addInsurance(newInsurance);
    setNewInsurance({
      PID: "",
      F_name: "",
      L_name: "",
      Insurance_Provider: "",
      Policy_Number: "",
      Coverage_Amount: "",
    });
  };

  const handleUpdate = (id) => {
    updateInsurance(id, { ...newInsurance });
  };

  const handleDelete = (id) => {
    deleteInsurance(id);
  };

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={6}>
      <Box mb={6} fontSize="xl" fontWeight="bold">
        Insurance Records
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
            <Th>Insurance ID</Th>
            <Th>Patient ID</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Provider</Th>
            <Th>Policy Number</Th>
            <Th>Coverage</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {insurance.map((record) => (
            <Tr key={record.Insurance_ID}>
              <Td>{record.Insurance_ID}</Td>
              <Td>{record.PID}</Td>
              <Td>{record.F_name}</Td>
              <Td>{record.L_name}</Td>
              <Td>{record.Insurance_Provider}</Td>
              <Td>{record.Policy_Number}</Td>
              <Td>{record.Coverage_Amount}</Td>
              <Td>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handleUpdate(record.Insurance_ID)}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  ml={2}
                  onClick={() => handleDelete(record.Insurance_ID)}
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
          value={newInsurance.PID}
          onChange={(e) => setNewInsurance({ ...newInsurance, PID: e.target.value })}
          mb={2}
        />
        <Input
          placeholder="First Name"
          value={newInsurance.F_name}
          onChange={(e) => setNewInsurance({ ...newInsurance, F_name: e.target.value })}
          mb={2}
        />
        <Input
          placeholder="Last Name"
          value={newInsurance.L_name}
          onChange={(e) => setNewInsurance({ ...newInsurance, L_name: e.target.value })}
          mb={2}
        />
        <Input
          placeholder="Insurance Provider"
          value={newInsurance.Insurance_Provider}
          onChange={(e) =>
            setNewInsurance({ ...newInsurance, Insurance_Provider: e.target.value })
          }
          mb={2}
        />
        <Input
          placeholder="Policy Number"
          value={newInsurance.Policy_Number}
          onChange={(e) =>
            setNewInsurance({ ...newInsurance, Policy_Number: e.target.value })
          }
          mb={2}
        />
        <Input
          placeholder="Coverage Amount"
          value={newInsurance.Coverage_Amount}
          onChange={(e) =>
            setNewInsurance({ ...newInsurance, Coverage_Amount: e.target.value })
          }
          mb={4}
        />
        <Button colorScheme="teal" onClick={handleAdd}>
          Add Insurance
        </Button>
      </Box>
    </Box>
  );
};

export default InsuranceManager;
