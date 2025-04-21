import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('authToken')
  );
  const [userProfession, setUserProfession] = useState(
    JSON.parse(localStorage.getItem('userData'))?.Profession || ''
  );
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = (profession) => {
    setIsAuthenticated(true);
    setUserProfession(profession);
    toast({
      title: "Login successful",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    const routeMap = {
      admin: '/admin/dashboard',
      doctor: '/doctor/dashboard',
      nurse: '/nurse/dashboard',
      patient: '/patient/dashboard',
      receptionist: '/receptionist/dashboard',
      labtechnician: '/lab/dashboard',
      pharmacist: '/pharmacy/dashboard',
      default: '/dashboard'
    };

    navigate(routeMap[profession.toLowerCase()] || routeMap.default);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserProfession('');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    toast({
      title: "Logged out successfully",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
    navigate('/login');
  };

  return { isAuthenticated, userProfession, handleLogin, handleLogout };
};