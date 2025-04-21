import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  useDisclosure,
  useColorModeValue,
  Spinner,
  Heading,
  Text,
  Button,
  useToast,
} from '@chakra-ui/react';
import Sidebar from './Sidebar';
import { useNavigate, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Check for authentication token and user data
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');

    if (!authToken || !userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedData = JSON.parse(userData);
      setUserRole(parsedData.Profession);
    } catch (error) {
      console.error('Error parsing user data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load user data. Please login again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userData');
    navigate('/login');
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const boxBgColor = useColorModeValue('white', 'gray.700');

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex minH="100vh" bg={bgColor}>
      <Sidebar userRole={userRole} isOpen={isOpen} onClose={onClose} />
      
      <Box flex="1" p="4">
        <Flex justify="space-between" align="center" mb="6">
          <Button onClick={onOpen} display={{ base: 'block', md: 'none' }}>
            Menu
          </Button>
          <Heading size="lg">Hospital Management System</Heading>
          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
        
        <Box bg={boxBgColor} p="6" rounded="lg" shadow="md">
        {/* Additional content can go here */}
        <Box bg={boxBgColor} p="6" rounded="lg" shadow="md">
            <Outlet /> {/* This will render the nested routes */}
        </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Dashboard;