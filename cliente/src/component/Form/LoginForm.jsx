import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
  Heading,
  Checkbox,
  Select,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    Profession: '',
    rememberMe: false,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Profession) {
      toast({
        title: 'Role Required',
        description: 'Please select your role',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        Username: formData.Username,
        Password: formData.Password,
        Profession: formData.Profession,
      });

      // Store token and user data
      const storage = formData.rememberMe ? localStorage : sessionStorage;
      storage.setItem('authToken', response.data.token);
      storage.setItem('userData', JSON.stringify(response.data.data));

      // Update login state
      setIsLoggedIn(true);
      setUserRole(response.data.data.Profession);

      toast({
        title: 'Login Successful',
        description: `Welcome, ${response.data.data.Username}!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Call the onLogin callback
      onLogin(response.data.data.Profession);
    } catch (error) {
      setFormData((prev) => ({ ...prev, Password: '' })); // Clear password field on error
      toast({
        title: 'Login Failed',
        description: error.response?.data?.message || 'Invalid credentials. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear localStorage or sessionStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userData');

    setIsLoggedIn(false);
    setUserRole('');
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  if (isLoggedIn) {
    return (
      <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" textAlign="center">
        <Heading as="h2" size="lg" mb={6}>
          Welcome, {userRole}
        </Heading>
        <Text mb={6}>You are logged in as a {userRole}.</Text>
        <Button colorScheme="red" onClick={handleLogout}>
          Log Out
        </Button>
      </Box>
    );
  }

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg">
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Sign in to your account
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="Username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
              placeholder="Enter your username"
              autoComplete="username"
            />
          </FormControl>

          <FormControl id="Password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </FormControl>

          <FormControl id="Profession" isRequired>
            <FormLabel>Select Your Role</FormLabel>
            <Select
              name="Profession"
              value={formData.Profession}
              onChange={handleChange}
              placeholder="Select your role"
            >
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
              <option value="Patient">Patient</option>
              <option value="Receptionist">Receptionist</option>
            </Select>
          </FormControl>

          <FormControl id="rememberMe">
            <Checkbox
              name="rememberMe"
              isChecked={formData.rememberMe}
              onChange={handleChange}
            >
              Remember me
            </Checkbox>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={isLoading}
            loadingText="Signing in..."
          >
            Sign In
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginForm;
