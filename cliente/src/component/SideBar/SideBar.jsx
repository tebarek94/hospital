import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Divider,
  useColorModeValue,
  Avatar,
  useDisclosure,
  Collapse,
  Button
} from '@chakra-ui/react';
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiCalendar,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiChevronRight,
  FiUser,
  FiPlusCircle,
  FiActivity,
  FiClipboard,
  FiLogIn
} from 'react-icons/fi';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const SideBar = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  const activeBg = useColorModeValue('blue.100', 'blue.700');
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  // Get user data from localStorage with proper error handling
  let userData = {};
  try {
    const storedData = localStorage.getItem('userData');
    userData = storedData ? JSON.parse(storedData) : {};
  } catch (error) {
    console.error('Error parsing user data:', error);
    userData = {};
  }

  const isAuthenticated = userData && Object.keys(userData).length > 0;
  const { Profession: profession = 'Guest', Username: username = 'Guest', avatarUrl = '' } = userData;

  // Get the correct dashboard path based on profession
  const getDashboardPath = () => {
    if (!profession) return '/';
    
    switch(profession.toLowerCase()) {
      case 'admin':
        return '/admin/dashboard';
      case 'doctor':
        return '/doctor/dashboard';
      case 'nurse':
        return '/nurse/dashboard';
      case 'patient':
        return '/patient/dashboard';
      case 'receptionist':
        return '/receptionist/dashboard';
      default:
        return '/';
    }
  };

  // Menu configuration with protected routes
  const menuConfig = {
    common: [
      { label: 'Home', icon: FiHome, path: '/', protected: false },
      { label: 'Dashboard', icon: FiHome, path: getDashboardPath(), protected: true },
    ],
    roleSpecific: {
      Admin: [
        { label: 'User Management', icon: FiUsers, path: '/admin/users', protected: true },
        { label: 'Reports', icon: FiActivity, path: '/admin/reports', protected: true },
        { label: 'Settings', icon: FiSettings, path: '/admin/settings', protected: true },
        { label: 'Departments', icon: FiClipboard, path: '/admin/departments', protected: true },
        { label: 'Add User', icon: FiClipboard, path: '/admin/register', protected: true },
        { label: 'Check out', icon: FiClipboard, path: '/admin/check', protected: true },
      ],
      Doctor: [
        { label: 'Medical Records', icon: FiFileText, path: '/doctor/records', protected: true },
        { label: 'Prescriptions', icon: FiFileText, path: '/doctor/prescriptions', protected: true },
      ],
      Nurse: [
        { label: 'Vital Signs', icon: FiActivity, path: '/nurse/vitals', protected: true },
        { label: 'Patient Care', icon: FiUser, path: '/nurse/patient-care', protected: true },
      ],
      Receptionist: [
        { label: 'New Registration', icon: FiPlusCircle, path: '/receptionist/register', protected: true },
        { label: 'Billing', icon: FiFileText, path: '/receptionist/billing', protected: true },
      ],
      Patient: [
        { label: 'My Appointments', icon: FiCalendar, path: '/patient/my-appointments', protected: true },
        { label: 'Medical History', icon: FiFileText, path: '/patient/medical-history', protected: true },
      ]
    },
    adminManagement: [
      { label: 'Departments', path: '/admin/create-department', protected: true },
      { label: 'System Settings', path: '/admin/system-settings', protected: true }
    ]
  };

  // Get filtered menu items based on role and authentication
  const getMenuItems = () => {
    const commonItems = menuConfig.common;
    
    if (!isAuthenticated) {
      return commonItems.filter(item => !item.protected);
    }

    const roleItems = profession && menuConfig.roleSpecific[profession] 
      ? menuConfig.roleSpecific[profession] 
      : [];
    
    return [...commonItems, ...roleItems];
  };

  const menuItems = getMenuItems();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  // Check if current path matches
  const isActive = (path) => location.pathname === path;

  return (
    <Box
      w={{ base: 'full', md: '280px' }}
      h="100vh"
      bg={bg}
      color={color}
      p={4}
      boxShadow="md"
      position="fixed"
      display="flex"
      flexDirection="column"
    >
      {/* Scrollable content area */}
      <Box flex="1" display="flex" flexDirection="column" overflowY="auto">
        {/* User Profile */}
        <VStack spacing={6} align="stretch">
          <HStack spacing={3} p={2} borderRadius="md" _hover={{ bg: hoverBg }}>
            <Avatar 
              size="md" 
              name={username} 
              src={avatarUrl} 
              bg={!isAuthenticated ? 'gray.500' : 'blue.500'} 
              color="white" 
            />
            <VStack align="flex-start" spacing={0}>
              <Text fontWeight="bold" noOfLines={1}>{username}</Text>
              <Text fontSize="sm" color="gray.500" noOfLines={1}>
                {isAuthenticated ? profession : 'Guest'}
              </Text>
            </VStack>
          </HStack>

          <Divider />

          {/* Main Navigation */}
          <VStack spacing={1} align="stretch" flex="1">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.path} style={{ textDecoration: 'none' }}>
                <HStack
                  spacing={4}
                  p={3}
                  borderRadius="md"
                  bg={isActive(item.path) ? activeBg : 'transparent'}
                  _hover={{ bg: hoverBg }}
                >
                  <Icon as={item.icon} boxSize={5} />
                  <Text fontSize="md">{item.label}</Text>
                </HStack>
              </Link>
            ))}

            {/* Admin Management Section - only for authenticated admins */}
            {isAuthenticated && profession === 'Admin' && (
              <>
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  onClick={onToggle}
                  rightIcon={isOpen ? <FiChevronDown /> : <FiChevronRight />}
                >
                  Management
                </Button>
                <Collapse in={isOpen}>
                  <VStack spacing={1} pl={8} align="stretch">
                    {menuConfig.adminManagement.map((item, index) => (
                      <Link key={index} to={item.path} style={{ textDecoration: 'none' }}>
                        <HStack
                          spacing={4}
                          p={2}
                          _hover={{ bg: hoverBg }}
                          bg={isActive(item.path) ? activeBg : 'transparent'}
                        >
                          <Text>{item.label}</Text>
                        </HStack>
                      </Link>
                    ))}
                  </VStack>
                </Collapse>
              </>
            )}
          </VStack>
        </VStack>
      </Box>

      {/* Bottom section - Login/Logout */}
      <Box mt="auto" w="full" pb={4}>
        <Divider mb={4} />
        {isAuthenticated ? (
          <HStack
            spacing={4}
            p={3}
            borderRadius="md"
            _hover={{ bg: hoverBg }}
            cursor="pointer"
            onClick={handleLogout}
          >
            <Icon as={FiLogOut} boxSize={5} />
            <Text fontSize="md">Logout</Text>
          </HStack>
        ) : (
          <HStack
            spacing={4}
            p={3}
            borderRadius="md"
            _hover={{ bg: hoverBg }}
            cursor="pointer"
            onClick={handleLogin}
          >
            <Icon as={FiLogIn} boxSize={5} />
            <Text fontSize="md">Login</Text>
          </HStack>
        )}
      </Box>
    </Box>
  );
};

export default SideBar;