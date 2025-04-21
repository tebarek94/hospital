import React, { useState } from "react";
import {
    Box,
    Button,
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
    Heading,
    VStack,
    HStack,
} from "@chakra-ui/react";
import useLabResult from "../hooks/useLabResult";

const LabResultManager = () => {
    const { labResults, loading, error, addLabResult, updateLabResult, deleteLabResult } =
        useLabResult();

    const [newLabResult, setNewLabResult] = useState({
        Lab_ID: "",
        PID: "",
        F_name: "",
        L_name: "",
        Lab_Type: "",
        Lab_result: "",
    });

    const [editing, setEditing] = useState(null); // Track editing state

    const handleAdd = () => {
        addLabResult(newLabResult);
        setNewLabResult({ Lab_ID: "", PID: "", F_name: "", L_name: "", Lab_Type: "", Lab_result: "" });
    };

    const handleEdit = (id) => {
        const result = labResults.find((result) => result.Lab_ID === id);
        setNewLabResult(result); // Set the form fields to the existing result values
        setEditing(id); // Set the editing flag
    };

    const handleSave = () => {
        if (editing) {
            updateLabResult(editing, newLabResult); // Update the result
            setEditing(null); // Reset editing flag
        } else {
            handleAdd(); 
        }
        setNewLabResult({ Lab_ID: "", PID: "", F_name: "", L_name: "", Lab_Type: "", Lab_result: "" });
    };

    const handleDelete = (id) => {
        deleteLabResult(id);
    };

    const generateLabReport = (result) => {
        const reportContent = `
        Lab Report:
        - Lab ID: ${result.Lab_ID}
        - Patient ID: ${result.PID}
        - Name: ${result.F_name} ${result.L_name}
        - Lab Type: ${result.Lab_Type}
        - Lab Result: ${result.Lab_result}
        `;
        alert(reportContent); // Replace with actual report generation logic
    };

    if (loading)
        return (
            <Box textAlign="center" py="6">
                <Spinner size="xl" />
            </Box>
        );

    if (error)
        return (
            <Alert status="error" mt="4">
                <AlertIcon />
                {error}
            </Alert>
        );

    return (
        <Box p="6">
            <Heading mb="6" textAlign="center">
                Lab Results
            </Heading>
            <Table variant="striped" colorScheme="teal">
                <Thead>
                    <Tr>
                        <Th>Lab ID</Th>
                        <Th>Patient ID</Th>
                        <Th>First Name</Th>
                        <Th>Last Name</Th>
                        <Th>Lab Type</Th>
                        <Th>Lab Result</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {labResults.map((result) => (
                        <Tr key={result.Lab_ID}>
                            <Td>{result.Lab_ID}</Td>
                            <Td>{result.PID}</Td>
                            <Td>{result.F_name}</Td>
                            <Td>{result.L_name}</Td>
                            <Td>{result.Lab_Type}</Td>
                            <Td>{result.Lab_result}</Td>
                            <Td>
                                <HStack spacing="2">
                                    <Button
                                        size="sm"
                                        colorScheme="blue"
                                        onClick={() => handleEdit(result.Lab_ID)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        colorScheme="red"
                                        onClick={() => handleDelete(result.Lab_ID)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        size="sm"
                                        colorScheme="green"
                                        onClick={() => generateLabReport(result)}
                                    >
                                        Generate Report
                                    </Button>
                                </HStack>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Box mt="8">
                <Heading size="md" mb="4">
                    {editing ? "Edit Lab Result" : "Add New Lab Result"}
                </Heading>
                <VStack spacing="4">
                    <Input
                        placeholder="Lab ID"
                        value={newLabResult.Lab_ID}
                        onChange={(e) => setNewLabResult({ ...newLabResult, Lab_ID: e.target.value })}
                    />
                    <Input
                        placeholder="Patient ID"
                        value={newLabResult.PID}
                        onChange={(e) => setNewLabResult({ ...newLabResult, PID: e.target.value })}
                    />
                    <Input
                        placeholder="First Name"
                        value={newLabResult.F_name}
                        onChange={(e) => setNewLabResult({ ...newLabResult, F_name: e.target.value })}
                    />
                    <Input
                        placeholder="Last Name"
                        value={newLabResult.L_name}
                        onChange={(e) => setNewLabResult({ ...newLabResult, L_name: e.target.value })}
                    />
                    <Input
                        placeholder="Lab Type"
                        value={newLabResult.Lab_Type}
                        onChange={(e) => setNewLabResult({ ...newLabResult, Lab_Type: e.target.value })}
                    />
                    <Input
                        placeholder="Lab Result"
                        value={newLabResult.Lab_result}
                        onChange={(e) =>
                            setNewLabResult({ ...newLabResult, Lab_result: e.target.value })
                        }
                    />
                    <Button colorScheme="teal" onClick={handleSave}>
                        {editing ? "Save Changes" : "Add Lab Result"}
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default LabResultManager;
