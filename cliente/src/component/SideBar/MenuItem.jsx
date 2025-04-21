import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const MenuItem = ({ item, isActive }) => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const activeBgColor = useColorModeValue('blue.50', 'blue.900');
  const activeColor = useColorModeValue('blue.600', 'blue.200');

  // Dynamically import the icon based on the string name
  const getIconComponent = (iconName) => {
    const icons = {
      activity: 'FiActivity',
      database: 'FiDatabase',
      // Add other icon mappings here
    };
    return icons[iconName] || 'FiCircle';
  };

  return (
    <Box
      onClick={() => navigate(item.path)}
      cursor="pointer"
      bg={isActive ? activeBgColor : 'transparent'}
      color={isActive ? activeColor : 'inherit'}
      _hover={{ bg: isActive ? activeBgColor : bgColor }}
      px={4}
      py={2}
      borderRadius="md"
      mb={1}
    >
      <Flex align="center">
        <Icon as={getIconComponent(item.icon)} mr={3} />
        <Text fontWeight={isActive ? 'semibold' : 'normal'}>{item.label}</Text>
      </Flex>
    </Box>
  );
};

export default MenuItem; // Added default export