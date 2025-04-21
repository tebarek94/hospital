import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Spinner,
  Text,
} from "@chakra-ui/react";

const DataTable = ({ columns, data, loading }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <Spinner size="lg" />
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box textAlign="center" mt={5}>
        <Text>No data available</Text>
      </Box>
    );
  }

  return (
    <Table variant="striped" colorScheme="teal">
      <Thead>
        <Tr>
          {columns.map((column) => (
            <Th key={column}>{column}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, index) => (
          <Tr key={index}>
            {columns.map((column) => (
              <Td key={column}>{row[column]}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DataTable;
