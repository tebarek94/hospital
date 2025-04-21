import { Button, Flex, Image, useColorMode } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);

    // Redirect to hospital website's homepage
    const hospitalHomePage = '/'; // Change this to the correct route or external URL if needed
    navigate(hospitalHomePage); // Use window.location.href for external URLs, e.g., window.location.href = "https://hospital-website.com";
  };

  const handleLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    // Listen for storage changes to update login status dynamically
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("authToken"));
      navigate('/');
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Flex 
      as="nav" 
      justifyContent="space-between" 
      alignItems="center" 
      p={4} 
      bg={colorMode === 'light' ? 'gray.100' : 'gray.900'}
      position="fixed"  // Make the navbar fixed
      top="0"           // Position it at the top of the page
      left="0"          // Align it to the left of the page
      width="100%"      // Ensure it spans the full width of the screen
      zIndex="1000"     // Ensure it stays on top of other content
    >
      <Image src={logo} alt="Logo" boxSize="40px" borderRadius="8" />
      {isLoggedIn ? (
        <Button colorScheme="red" variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Link to="/login">
          <Button colorScheme="teal" variant="outline" onClick={handleLogin}>
            Login
          </Button>
        </Link>
      )}
      <Button onClick={toggleColorMode}>
        Toggle to {colorMode === 'light' ? 'dark' : 'light'}
      </Button>
    </Flex>
  );
};

export default NavBar;
