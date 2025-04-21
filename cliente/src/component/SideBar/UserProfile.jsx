import { Avatar, Box, Text, VStack, useColorModeValue } from '@chakra-ui/react';

const UserProfile = ({ username, profession, isAuthenticated, avatarUrl }) => {
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <VStack
      py={6}
      mb={4}
      borderBottom="1px"
      borderColor={borderColor}
      spacing={2}
    >
      <Avatar
        size="lg"
        name={username}
        src={avatarUrl}
        mb={2}
      />
      <Text fontWeight="bold">{username}</Text>
      <Text fontSize="sm" color={textColor}>
        {isAuthenticated ? profession : 'Guest User'}
      </Text>
    </VStack>
  );
};

export default UserProfile;