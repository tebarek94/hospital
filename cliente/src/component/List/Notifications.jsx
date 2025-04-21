import React, { useEffect, useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, useToast, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Textarea } from '@chakra-ui/react';
import axios from 'axios';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]); // Initialize as an empty array
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to manage modal open/close
  const [newStatus] = useState('unread'); // Set the default status for the notification
  const toast = useToast();

  const userId = 1; // Use the correct user ID here

  // Fetch all notifications for the user
  const fetchNotifications = () => {
    axios.get(`/api/notifications/${userId}`)
      .then((response) => {
        if (response.data && response.data.data) {
          setNotifications(response.data.data);
        } else {
          setNotifications([]); // In case the response does not contain the expected data
        }
      })
      .catch(() => {
        toast({
          title: 'Error fetching notifications.',
          description: 'Unable to load notifications.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setNotifications([]); // If the fetch fails, set notifications to an empty array
      });
  };

  useEffect(() => {
    fetchNotifications();
  }, );

  // Add a new notification
  const handleAddNotification = () => {
    axios.post('/api/notifications', { user_id: userId, message: newMessage, status: newStatus })
      .then(() => {
        toast({
          title: 'Notification Created.',
          description: 'The notification has been successfully created.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        fetchNotifications(); // Refresh the notifications list after adding
        setIsOpen(false); // Close the modal after adding the notification
      })
      .catch(() => {
        toast({
          title: 'Error creating notification.',
          description: 'There was an issue creating the notification.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  // Delete notification
  const handleDeleteNotification = (notificationId) => {
    axios.delete(`/api/notifications/${notificationId}`)
      .then(() => {
        toast({
          title: 'Notification Deleted.',
          description: 'The notification was successfully deleted.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        fetchNotifications(); // Refresh the notifications list after deleting
      })
      .catch(() => {
        toast({
          title: 'Error deleting notification.',
          description: 'There was an issue deleting the notification.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  // Edit notification (this could open a modal or form for editing)
  const handleEditNotification = (notificationId) => {
    console.log(`Edit notification with ID: ${notificationId}`);
    // Implement your edit functionality (could open a modal for editing)
  };

  // Open modal for adding notification
  const onOpen = () => setIsOpen(true);

  // Close modal
  const onClose = () => setIsOpen(false);

  return (
    <Box p={6}>
      <Button colorScheme="blue" onClick={onOpen} mb={4}>
        Add Notification
      </Button>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Message</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {notifications && notifications.length > 0 ? (
            notifications.map((notification) => (
              <Tr key={notification.notification_id}>
                <Td>{notification.message}</Td>
                <Td>{notification.status}</Td>
                <Td>
                  <Button 
                    leftIcon={<FiEdit />} 
                    colorScheme="yellow" 
                    onClick={() => handleEditNotification(notification.notification_id)} 
                    mr={2}
                  >
                    Edit
                  </Button>
                  <IconButton 
                    icon={<FiTrash2 />} 
                    colorScheme="red" 
                    onClick={() => handleDeleteNotification(notification.notification_id)} 
                    aria-label="Delete" 
                  />
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="3" textAlign="center">No notifications available</Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {/* Add Notification Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Notification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea 
              placeholder="Enter notification message" 
              value={newMessage} 
              onChange={(e) => setNewMessage(e.target.value)} 
              mb={4}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddNotification}>
              Add Notification
            </Button>
            <Button variant="ghost" onClick={onClose} ml={3}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Notifications;
