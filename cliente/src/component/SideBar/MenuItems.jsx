import { VStack, HStack, Icon, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useColorModeValue } from '@chakra-ui/react';

export const MenuItems = ({ items, isActive }) => {
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  const activeBg = useColorModeValue('blue.100', 'blue.700');

  return (
    <VStack spacing={1} align="stretch" flex="1">
      {items.map((item, index) => (
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
    </VStack>
  );
};