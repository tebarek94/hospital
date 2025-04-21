import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getMenuItems } from './menuConfig';
import MenuItem from './MenuItem';
import UserProfile from './UserProfile';
import AuthButton from './AuthButton';
import AdminMenu from './AdminMenu';

const SideBar = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const navigate = useNavigate();
  const location = useLocation();

  // Get user data
  let userData = {};
  try {
    const storedData = localStorage.getItem('userData');
    userData = storedData ? JSON.parse(storedData) : {};
  } catch (error) {
    console.error('Error parsing user data:', error);
  }

  const isAuthenticated = !!userData?.Username;
  const profession = userData?.Profession || 'Guest';
  const username = userData?.Username || 'Guest';
  const avatarUrl = userData?.avatarUrl || '';

  const menuItems = getMenuItems(profession);
  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <Box
      w={{ base: 'full', md: '280px' }}
      h="100vh"
      bg={bg}
      p={4}
      boxShadow="md"
      position="fixed"
      display="flex"
      flexDirection="column"
    >
      <Box flex="1" display="flex" flexDirection="column" overflowY="auto">
        <UserProfile
          username={username}
          profession={profession}
          isAuthenticated={isAuthenticated}
          avatarUrl={avatarUrl}
        />

        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            item={item}
            isActive={isActive(item.path)}
            onClick={() => handleNavigation(item.path)}
          />
        ))}

        {isAuthenticated && profession === 'Admin' && (
          <AdminMenu isActive={isActive} />
        )}
      </Box>

      <AuthButton
        isAuthenticated={isAuthenticated}
        onLogin={() => handleNavigation('/login')}
        onLogout={handleLogout}
      />
    </Box>
  );
};

export default SideBar;