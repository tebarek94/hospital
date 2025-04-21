import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import Checkout from '../../page/Checkout';

const CheckOutPayment = () => {
  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    currency: "ETB",
    tx_ref: "",
    email: "",
    phone: "",
    description: "",
    public_key: "CHAPUBK_TEST-yMqeUvtEJQ0jgBLwCWs9yHSIPnjIxPFe",
    amount: "0",
    title: "",
  });

  useEffect(() => {
    // Update tx_ref when the first name changes
    if (input.first_name) {
      const randomNum = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number
      setInput((prev) => ({
        ...prev,
        tx_ref: `${input.first_name.toLowerCase()}-tx-${randomNum}`,
      }));
    }
  }, [input.first_name]);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg">
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Checkout Payment
      </Heading>

      <form>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              name="first_name"
              value={input.first_name}
              onChange={handleInputChange}
              placeholder="First Name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              name="last_name"
              value={input.last_name}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Phone</FormLabel>
            <Input
              type="tel"
              name="phone"
              value={input.phone}
              onChange={handleInputChange}
              placeholder="+251900000000"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={handleInputChange}
              placeholder="Enter your address"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Amount (ETB)</FormLabel>
            <Input
              type="number"
              name="amount"
              value={input.amount}
              onChange={handleInputChange}
              min="1"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={handleInputChange}
              placeholder="Description of payment"
            />
          </FormControl>

          <Checkout
            first_name={input.first_name}
            last_name={input.last_name}
            email={input.email}
            phone={input.phone}
            amount={input.amount}
            currency={input.currency}
            public_key={input.public_key}
            description={input.description}
            tx_ref={input.tx_ref}
          />
        </VStack>
      </form>

      <Text mt={4} fontSize="sm" color="gray.500" textAlign="center">
        You'll be redirected to Chapa's secure payment page
      </Text>
    </Box>
  );
};

export default CheckOutPayment;
