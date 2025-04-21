import { Button, useColorModeValue } from '@chakra-ui/react';

const AuthButton = ({ isAuthenticated, onLogin, onLogout }) => {
  const buttonScheme = useColorModeValue('blue', 'blue');
  const hoverBg = useColorModeValue('blue.600', 'blue.300');

  return (
    <Button
      colorScheme={buttonScheme}
      _hover={{ bg: hoverBg }}
      onClick={isAuthenticated ? onLogout : onLogin}
      size="md"
    >
      {isAuthenticated ? 'Log Out' : 'Log In'}
    </Button>
  );
};

export default AuthButton;