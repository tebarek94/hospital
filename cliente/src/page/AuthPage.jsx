// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Select,
//   Stack,
//   Heading,
//   Text,
//   useToast,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   Flex,
//   Checkbox,
//   Link
// } from '@chakra-ui/react';
// import axios from 'axios';

// const AuthPage = () => {
//   const [IsLogin, setIsLogin] = useState(true);
//   const [Username, setUsername] = useState('');
//   const [Password, setPassword] = useState('');
//   const [Email, setEmail] = useState('');
//   const [Profession, setProfession] = useState('Doctor');
//   const [RememberMe, setRememberMe] = useState(false);
//   const toast = useToast();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const endpoint = IsLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
//       const payload = IsLogin 
//         ? { Username, Password }
//         : { Username, Password, Email, Profession };

//       const response = await axios.post(endpoint, payload);
      
//       toast({
//         title: 'Success',
//         description: IsLogin ? 'Login successful' : 'Account created successfully',
//         status: 'success',
//         duration: 5000,
//         isClosable: true,
//       });

//       // Save token to localStorage if RememberMe is checked
//       if (RememberMe && response.data.token) {
//         localStorage.setItem('authToken', response.data.token);
//         localStorage.setItem('user', JSON.stringify(response.data.data));
//       }

//       // Redirect or update app state here
//       console.log('Auth successful', response.data);

//     } catch (error) {
//       let errorMessage = 'An error occurred';
//       if (error.response) {
//         errorMessage = error.response.data.message || 
//           (error.response.data.errors && error.response.data.errors.join(', ')) || 
//           errorMessage;
//       }

//       toast({
//         title: 'Error',
//         description: errorMessage,
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <Flex minHeight="100vh" align="center" justify="center" bg="gray.50">
//       <Box 
//         p={8} 
//         maxWidth="500px" 
//         borderWidth={1} 
//         borderRadius={8} 
//         boxShadow="lg" 
//         bg="white"
//         width="100%"
//       >
//         <Tabs 
//           index={IsLogin ? 0 : 1} 
//           onChange={(index) => setIsLogin(index === 0)}
//           isFitted
//           variant="enclosed"
//         >
//           <TabList mb="1em">
//             <Tab>Login</Tab>
//             <Tab>Register</Tab>
//           </TabList>
//           <TabPanels>
//             <TabPanel>
//               <Heading size="lg" mb={6} textAlign="center">Login to Your Account</Heading>
//               <form onSubmit={handleSubmit}>
//                 <Stack spacing={4}>
//                   <FormControl id="login-Username" isRequired>
//                     <FormLabel>Username</FormLabel>
//                     <Input 
//                       type="text" 
//                       value={Username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       placeholder="Enter your username"
//                     />
//                   </FormControl>
//                   <FormControl id="login-Password" isRequired>
//                     <FormLabel>Password</FormLabel>
//                     <Input 
//                       type="password" 
//                       value={Password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Enter your password"
//                     />
//                   </FormControl>
//                   <Flex justify="space-between" align="center">
//                     <Checkbox 
//                       isChecked={RememberMe}
//                       onChange={(e) => setRememberMe(e.target.checked)}
//                     >
//                       Remember me
//                     </Checkbox>
//                     <Link color="blue.500" href="#">
//                       Forgot password?
//                     </Link>
//                   </Flex>
//                   <Button 
//                     type="submit" 
//                     colorScheme="blue" 
//                     width="full" 
//                     mt={4}
//                     isLoading={false} // Set to true during API call
//                   >
//                     Login
//                   </Button>
//                 </Stack>
//               </form>
//             </TabPanel>
//             <TabPanel>
//               <Heading size="lg" mb={6} textAlign="center">Create New Account</Heading>
//               <form onSubmit={handleSubmit}>
//                 <Stack spacing={4}>
//                   <FormControl id="register-Username" isRequired>
//                     <FormLabel>Username</FormLabel>
//                     <Input 
//                       type="text" 
//                       name='Username'
//                       value={Username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       placeholder="At least 3 characters"
//                     />
//                   </FormControl>
//                   <FormControl id="register-Email" isRequired>
//                     <FormLabel>Email</FormLabel>
//                     <Input 
//                       type="email" name='email'
//                       value={Email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="Enter your email"
//                     />
//                   </FormControl>
//                   <FormControl id="register-Password" isRequired>
//                     <FormLabel>Password</FormLabel>
//                     <Input 
//                       type="password" 
//                       name='Password'
//                       value={Password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="At least 6 characters"
//                     />
//                   </FormControl>
//                   <FormControl id="register-Profession" isRequired>
//                     <FormLabel>Profession</FormLabel>
//                     <Select 
//                       value={Profession}
//                       onChange={(e) => setProfession(e.target.value)}
//                       name='Profession'
//                     >
//                       <option value="Admin">Admin</option>
//                       <option value="Doctor">Doctor</option>
//                       <option value="Nurse">Nurse</option>
//                       <option value="Receptionist">Receptionist</option>
//                       <option value="LabTechnician">Lab Technician</option>
//                       <option value="Pharmacist">Pharmacist</option>
//                     </Select>
//                   </FormControl>
//                   <Button 
//                     type="submit" 
//                     colorScheme="blue" 
//                     width="full" 
//                     mt={4}
//                     isLoading={false} // Set to true during API call
//                   >
//                     Register
//                   </Button>
//                 </Stack>
//               </form>
//             </TabPanel>
//           </TabPanels>
//         </Tabs>
        
//         <Text mt={4} textAlign="center">
//           {IsLogin ? (
//             <>Don't have an account? <Link color="blue.500" onClick={() => setIsLogin(false)}>Register</Link></>
//           ) : (
//             <>Already have an account? <Link color="blue.500" onClick={() => setIsLogin(true)}>Login</Link></>
//           )}
//         </Text>
//       </Box>
//     </Flex>
//   );
// };

// export default AuthPage;
