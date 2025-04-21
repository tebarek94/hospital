import * as React from 'react';
import {
  Box, Grid, GridItem, useBreakpointValue, IconButton, Drawer, DrawerBody,
  DrawerOverlay, DrawerContent, DrawerCloseButton, useToast
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Components
import NavBar from './component/NavBar';
import LoginForm from './component/Form/LoginForm';
import HospitalWebsite from './page/HospitalWebsite';
import Dashboard from './page/Dashboard';

// Admin Components
import RegisterForm from './component/Form/RegisterForm';
import CreateDepartment from './component/Form/CreateDepartment';
import CheckOutPayment from './component/Form/CheckOutPayment';
import AdminReports from './page/AdminReports';
import SystemSettings from './page/SystemSettings';

// Doctor Components
import PatientsList from './component/List/PatientsList';
import Prescriptions from './page/Prescriptions';
import Appointments from './page/Appointments';
import DoctorRecords from './page/DoctorRecords';

// Nurse Components
import PatientCare from './page/PatientCare';
import Vitals from './page/Vitals';

import RegisterPatient from './component/Form/RegisterPatient';
import SideBar from './component/SideBar';
import EmergencyContactDetails from './component/List/EmergencyContactDetails';
import AppointmentsPage from './page/AppointmentsPage';
import ReceptionistBilling from './page/Registration';
import EmergencyContactList from './page/EmergencyContactList';
import PatientHistory from './page/usePatientHistory';
import LabResults from './page/useLabResult';
import PrescriptionList from './page/PrescriptionList';
import PaymentManager from './page/PaymentManager';
import NotificationLogs from './page/NotificationLogs';
import AppointmentManager from './page/AppointmentManager';
import InsuranceManager from './page/InsuranceManager';
import UserManagement from './page/UserManagement';
import DepartmentPage from './page/DepartmentPage';
import Checkout from './page/Checkout';

const App = () => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    Boolean(localStorage.getItem('authToken'))
  );
  const [userProfession, setUserProfession] = React.useState(
    JSON.parse(localStorage.getItem('userData'))?.Profession || ''
  );

  const toast = useToast();
  const navigate = useNavigate();
  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogin = (profession) => {
    setIsAuthenticated(true);
    setUserProfession(profession);
    localStorage.setItem('authToken', 'sampleAuthToken'); // Replace with actual token logic
    localStorage.setItem('userData', JSON.stringify({ Profession: profession }));

    toast({
      title: 'Login successful',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    const routeMap = {
      admin: '/admin/dashboard',
      doctor: '/doctor/dashboard',
      nurse: '/nurse/dashboard',
      patient: '/patient/dashboard',
      receptionist: '/receptionist/dashboard',
    };

    navigate(routeMap[profession.toLowerCase()] || '/dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserProfession('');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');

    toast({
      title: 'Logged out successfully',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });

    navigate('/');
  };

  const ProtectedRoute = ({ children, requiredProfession }) => {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (requiredProfession && userProfession.toLowerCase() !== requiredProfession.toLowerCase()) {
      return <Navigate to={`/${userProfession.toLowerCase()}/dashboard`} replace />;
    }
    return children;
  };

  return (
    <Box>
      {isAuthenticated ? (
        <Grid
          templateAreas={{ base: `"nav" "main"`, md: `"nav nav" "aside main"` }}
          templateColumns={{ base: '1fr', md: '250px 1fr' }}
          templateRows={{ base: 'auto 1fr', md: 'auto 1fr' }}
          h="100vh"
          gap={4}
        >
          <GridItem as="nav" area="nav">
            <NavBar onLogout={handleLogout} />
          </GridItem>

          {isMobile ? (
            <>
              <IconButton
                icon={<HamburgerIcon />}
                aria-label="Open Menu"
                onClick={toggleDrawer}
                position="fixed"
                top={4}
                left={4}
                zIndex={20}
              />
              <Drawer isOpen={isDrawerOpen} placement="left" onClose={toggleDrawer}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerBody>
                    <SideBar />
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          ) : (
            <GridItem as="aside" area="aside" p={4} mt={15}>
              <SideBar />
            </GridItem>
          )}

          <GridItem as="main" area="main" p={4} mt={15}>
            <Routes>
              <Route path="/" element={<HospitalWebsite />} />
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute requiredProfession="admin"><Dashboard /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute requiredProfession="admin"><UserManagement /></ProtectedRoute>} />
              <Route path="/admin/reports" element={<ProtectedRoute requiredProfession="admin"><AdminReports /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute requiredProfession="admin"><SystemSettings /></ProtectedRoute>} />
              <Route path="/admin/create-department" element={<ProtectedRoute requiredProfession="admin"><CreateDepartment /></ProtectedRoute>} />
              <Route path="/admin/checkout-payment" element={<ProtectedRoute requiredProfession="admin"><CheckOutPayment /></ProtectedRoute>} />
              <Route path="/admin/adduser" element={<ProtectedRoute requiredProfession="admin"><RegisterForm /></ProtectedRoute>} />
              <Route path="/admin/contact" element={<ProtectedRoute requiredProfession="admin"><EmergencyContactDetails /></ProtectedRoute>} />
              <Route path="/admin/addpatients" element={<ProtectedRoute requiredProfession="admin"><RegisterPatient /></ProtectedRoute>} />
              <Route path="/admin/prescriptionlist" element={<ProtectedRoute requiredProfession="admin"><PrescriptionList /></ProtectedRoute>} />
              <Route path="/admin/emergencylist" element={<ProtectedRoute requiredProfession="admin"><EmergencyContactList /></ProtectedRoute>} />
              <Route path="/admin/history" element={<ProtectedRoute requiredProfession="admin"><PatientHistory /></ProtectedRoute>} />
              <Route path="/admin/labr" element={<ProtectedRoute requiredProfession="admin"><LabResults /></ProtectedRoute>} />
              <Route path="/admin/pre" element={<ProtectedRoute requiredProfession="admin"><PrescriptionList /></ProtectedRoute>} />
              <Route path="/admin/paym" element={<ProtectedRoute requiredProfession="admin"><PaymentManager /></ProtectedRoute>} />
              <Route path="/admin/notifiy" element={<ProtectedRoute requiredProfession="admin"><NotificationLogs /></ProtectedRoute>} />
              <Route path="/admin/insuranc" element={<ProtectedRoute requiredProfession="admin"><InsuranceManager /></ProtectedRoute>} />
              <Route path="/admin/appointements" element={<ProtectedRoute requiredProfession="admin"><AppointmentManager /></ProtectedRoute>} />
              <Route path="/admin/deparetement" element={<ProtectedRoute requiredProfession="admin"><DepartmentPage /></ProtectedRoute>} />



              {/* Doctor Routes */}
              <Route path="/doctor/dashboard" element={<ProtectedRoute requiredProfession="doctor"><Dashboard /></ProtectedRoute>} />
              <Route path="/doctor/patients" element={<ProtectedRoute requiredProfession="doctor"><PatientsList /></ProtectedRoute>} />
              <Route path="/doctor/lab-results" element={<ProtectedRoute requiredProfession="doctor"><LabResults /></ProtectedRoute>} />
              <Route path="/doctor/prescriptions" element={<ProtectedRoute requiredProfession="doctor"><Prescriptions /></ProtectedRoute>} />
              <Route path="/doctor/records" element={<ProtectedRoute requiredProfession="doctor"><DoctorRecords /></ProtectedRoute>} />
              <Route path="/doctor/appointment" element={<ProtectedRoute requiredProfession="doctor"><AppointmentsPage /></ProtectedRoute>} />

              {/* Nurse Routes */}
              <Route path="/nurse/dashboard" element={<ProtectedRoute requiredProfession="nurse"><Dashboard /></ProtectedRoute>} />
              <Route path="/nurse/patient-care" element={<ProtectedRoute requiredProfession="nurse"><PatientCare /></ProtectedRoute>} />
              <Route path="/nurse/vitals" element={<ProtectedRoute requiredProfession="nurse"><Vitals /></ProtectedRoute>} />

              {/* Receptionist Routes */}
              <Route path="/receptionist/dashboard" element={<ProtectedRoute requiredProfession="receptionist"><Dashboard /></ProtectedRoute>} />
              <Route path="/receptionist/billing" element={<ProtectedRoute requiredProfession="receptionist"><ReceptionistBilling /></ProtectedRoute>} />

              {/* Patient Routes */}
              <Route path="/patient/dashboard" element={<ProtectedRoute requiredProfession="patient"><Dashboard /></ProtectedRoute>} />
              <Route path="/patient/appointments" element={<ProtectedRoute requiredProfession="patient"><Appointments /></ProtectedRoute>} />
              <Route path="/patient/appointments" element={<ProtectedRoute requiredProfession="patient"><Checkout /></ProtectedRoute>} />
            </Routes>
          </GridItem>
        </Grid>
      ) : (
        <Routes>
          <Route path="/" element={<HospitalWebsite />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        </Routes>
      )}
    </Box>
  );
};

export default App;
