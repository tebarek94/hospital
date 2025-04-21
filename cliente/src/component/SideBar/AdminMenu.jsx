import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import MenuItem from './MenuItem';
import { Navigate } from 'react-router-dom';

const AdminMenu = ({ isActive }) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const adminItems = [
    { path: '/admin/audit', label: 'Audit Logs', icon: 'activity' },
    { path: '/admin/backup', label: 'System Backup', icon: 'database' },
  ];

  return (
    <Box mt={8} pt={4} borderTop="1px" borderColor={borderColor}>
      <Text fontSize="xs" fontWeight="bold" mb={2} px={4} opacity={0.7}>
        ADMIN TOOLS
      </Text>
      {adminItems.map((item) => (
        <MenuItem
          key={item.path}
          item={item}
          isActive={isActive(item.path)}
          onClick={() => Navigate(item.path)}
        />
      ))}
    </Box>
  );
};

export default AdminMenu;