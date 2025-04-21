import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import useNotification from "../hooks/useNotification";

const NotificationLogs = () => {
  const notifications = useNotification();

  if (!notifications.length) {
    return (
      <Box textAlign="center" mt={6}>
        <Spinner size="lg" />
        <Box mt={2}>Fetching audit logs...</Box>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <Box mb={6} fontSize="xl" fontWeight="bold">
        Audit Logs
      </Box>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Log ID</Th>
            <Th>Session ID</Th>
            <Th>Username</Th>
            <Th>Profession</Th>
            <Th>Action</Th>
            <Th>Timestamp</Th>
          </Tr>
        </Thead>
        <Tbody>
          {notifications.map((log) => (
            <Tr key={log.Log_ID}>
              <Td>{log.Log_ID}</Td>
              <Td>{log.SID}</Td>
              <Td>{log.Username}</Td>
              <Td>{log.Profession}</Td>
              <Td>{log.Action}</Td>
              <Td>{new Date(log.Timestamp).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default NotificationLogs;
