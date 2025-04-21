import React from 'react';
import {
  Box,
  Flex,
  IconButton,
  VStack,
  Link,
  Text,
  useColorModeValue,
  CloseButton,
  Divider,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiUser,
  FiCalendar,
  FiFileText,
  FiSettings,
  FiPlusCircle,
  FiUsers,
  FiActivity,
  FiPieChart,
} from 'react-icons/fi';

const SidebarItem = ({ icon, children, to, ...rest }) => {
  return (
    <Link
      as={NavLink}
      to={to}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      _activeLink={{
        bg: 'blue.500',
        color: 'white',
      }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'blue.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Box
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
          >
            {icon}
          </Box>
        )}
        {children}
      </Flex>
    </Link>
  );
};

const Sidebar = ({ userRole, isOpen, onClose }) => {
  const Navigate = useNavigate();
  
  // Common items for all roles
  const commonItems = [
    { icon: <FiHome />, name: 'Dashboard', path: '/dashboard' },
    { icon: <FiUser />, name: 'Profile', path: '/profile' },
  ];

  // Role-specific items
  const roleBasedItems = {
    Admin: [
      { icon: <FiUsers />, name: 'Users', path: '/admin/users' },
      { icon: <FiSettings />, name: 'Settings', path: '/admin/settings' },
      { icon: <FiPieChart />, name: 'Reports', path: '/admin/reports' },
    ],
    Doctor: [
      { icon: <FiCalendar />, name: 'Appointments', path: '/doctor/appointments' },
      { icon: <FiFileText />, name: 'Patient Records', path: '/doctor/records' },
    ],
    Nurse: [
      { icon: <FiCalendar />, name: 'Patient Care', path: '/nurse/patients' },
      { icon: <FiPlusCircle />, name: 'Vitals', path: '/nurse/vitals' },
    ],
    Receptionist: [
      { icon: <FiPlusCircle />, name: 'Register Patient', path: '/reception/register' },
      { icon: <FiCalendar />, name: 'Schedule', path: '/reception/schedule' },
    ],
    Patient: [
      { icon: <FiActivity />, name: 'My Health', path: '/patient/health' },
      { icon: <FiCalendar />, name: 'My Appointments', path: '/patient/appointments' },
    ],
  };

  // Get items for the current user role
  const sidebarItems = [
    ...commonItems,
    ...(roleBasedItems[userRole] || []),
  ];

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue('white', 'gray.800')}
      borderRightWidth="1px"
      w={{ base: isOpen ? 'full' : '0', md: '60' }}
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      transition="all 0.3s"
    >
      <Flex px="4" py="5" align="center">
        <Text fontSize="2xl" ml="2" color="blue.500" fontWeight="semibold">
          HMS
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} ml="auto" />
      </Flex>
      
      <VStack spacing="1" align="stretch">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.path} icon={item.icon} to={item.path}>
            {item.name}
          </SidebarItem>
        ))}
      </VStack>
      
      <Divider my="4" />
      
      <Box px="4">
        <Text fontSize="sm" color="gray.500" mb="2">
          Logged in as: {userRole}
        </Text>
      </Box>
    </Box>
  );
};

export default Sidebar;