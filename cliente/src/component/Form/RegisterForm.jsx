import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  useToast,
  Heading,
  Text,
  Link,
  Checkbox,
  HStack
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    Username: '',  // Changed to match backend
    Email: '',      // Changed to match backend
    Password: '',   // Changed to match backend
    Profession: '', // Changed to match backend
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const professions = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Doctor', label: 'Doctor' },
    { value: 'Nurse', label: 'Nurse' },
    { value: 'Receptionist', label: 'Receptionist' },
    { value: 'LabTechnician', label: 'Lab Technician' },
    { value: 'Patient', label: 'Patient' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.agreeToTerms) {
      toast({
        title: 'Terms Required',
        description: 'You must agree to the terms and conditions',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/users/register', {
        Username: formData.Username,
        Email: formData.Email,
        Password: formData.Password,
        Profession: formData.Profession
      });

      toast({
        title: 'Account created',
        description: 'Registration successful!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Redirect to login or dashboard based on role
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration failed',
        description: error.response?.data?.message || 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg">
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Create an Account
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="Username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="Username"  // Changed to match backend
              value={formData.Username}
              onChange={handleChange}
              placeholder="Enter your username"
              autoComplete="username"
            />
          </FormControl>

          <FormControl id="Email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="Email"  // Changed to match backend
              value={formData.Email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </FormControl>

          <FormControl id="Password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="Password"  // Changed to match backend
              value={formData.Password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
            />
          </FormControl>

          <FormControl id="Profession" isRequired>
            <FormLabel>Profession/Role</FormLabel>
            <Select
              name="Profession"  // Changed to match backend
              value={formData.Profession}
              onChange={handleChange}
              placeholder="Select your profession"
            >
              {professions.map(prof => (
                <option key={prof.value} value={prof.value}>
                  {prof.label}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="agreeToTerms">
            <HStack>
              <Checkbox
                name="agreeToTerms"
                isChecked={formData.agreeToTerms}
                onChange={handleChange}
              >
                I agree to the{' '}
                <Link color="blue.500" href="/terms" isExternal>
                  Terms and Conditions
                </Link>
              </Checkbox>
            </HStack>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={isLoading}
            loadingText="Registering..."
          >
            Register
          </Button>

          <Text>
            Already have an account?{' '}
            <Link color="blue.500" href="/login">
              Sign in
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default RegisterForm;