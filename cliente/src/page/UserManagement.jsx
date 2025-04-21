import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Spinner,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data.data || []);
    } catch (error) {
      toast({
        title: 'Error fetching users',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.Username || '',
      email: user.Email || '',
      password: '',
    });
    onOpen();
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await axios.put(`http://localhost:5000/api/users/${selectedUser.SID}`, formData);

      setUsers((prev) =>
        prev.map((user) => (user.SID === selectedUser.SID ? { ...user, ...formData } : user))
      );

      toast({
        title: 'User updated',
        description: 'User account has been updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      toast({
        title: 'Error updating user',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    onDeleteOpen();
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/api/users/${selectedUser.SID}`);

      setUsers((prev) => prev.filter((user) => user.SID !== selectedUser.SID));

      toast({
        title: 'User deleted',
        description: 'User account has been deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onDeleteClose();
    } catch (error) {
      toast({
        title: 'Error deleting user',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="200px">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={6}>
        User Management
        <Button ml={4}>
          <Link to="/register">Add User</Link>
        </Button>
      </Heading>

      {users.length === 0 ? (
        <Text>No users found</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {users.map((user) => (
            <Card key={user.SID} variant="outline">
              <CardHeader>
                <Heading size="md">{user.Username}</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  <strong>Email:</strong> {user.Email}
                </Text>
                <Text mt={2}>
                  <strong>ID:</strong> {user.SID}
                </Text>
                <Text mt={2}>
                  <strong>Role:</strong> {user.Profession || 'N/A'}
                </Text>
              </CardBody>
              <CardFooter justifyContent="flex-end">
                <IconButton
                  icon={<EditIcon />}
                  aria-label="Edit user"
                  colorScheme="blue"
                  mr={2}
                  onClick={() => handleEditClick(user)}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  aria-label="Delete user"
                  colorScheme="red"
                  onClick={() => handleDeleteClick(user)}
                />
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password (leave blank to keep current)</FormLabel>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="New password"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate} isLoading={isUpdating}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete {selectedUser?.Username}? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3} isLoading={isDeleting}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default UserManagement;
