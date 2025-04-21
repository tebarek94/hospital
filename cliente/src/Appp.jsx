import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './component/App/MainLayout';
import { useAuth } from './component/hooks/useAuth';
import { AuthLayout } from './component/App/AuthLayout';

// Admin Pages
import Dashboard from './page/Dashboard';
import CreateDepartment from './component/Form/CreateDepartment';
import RegisterForm from './component/Form/RegisterForm';

// Doctor Pages


// Patient Pages
import MyAppointments from './page/patient/MyAppointments';
import PatientMedicalHistory from './page/patient/MedicalHistory';

// Common Pages
import HospitalWebsite from './page/HospitalWebsite';
import { ProtectedRoute } from './ProtectedRoute';
import BedInformationForm from './component/Form/BedInformationForm';
import CheckOutPayment from './component/Form/CheckOutPayment';
import LabResults from './page/LabResults';
import PatientProfile from './page/PatientProfile';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Box>
      {isAuthenticated ? (
        <MainLayout>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute requiredProfession="admin">
                <Dashboard />
              </ProtectedRoute>
            } />
           
             <Route path="/admin/bedin" element={
              <ProtectedRoute requiredProfession="admin">
                <BedInformationForm />
              </ProtectedRoute>
              
            } />
             <Route path="/admin/check" element={
              <ProtectedRoute requiredProfession="admin">
                <CheckOutPayment/>
              </ProtectedRoute>
              
            } />
             <Route path="/admin/lab" element={
              <ProtectedRoute requiredProfession="admin">
                <LabResults/>
              </ProtectedRoute>
              
            } />
             <Route path="/admin/lab" element={
              <ProtectedRoute requiredProfession="admin">
                <LabResults/>
              </ProtectedRoute>
              
            } />
      
            <Route path="/admin/profile" element={
              <ProtectedRoute requiredProfession="admin">
                <PatientProfile />
              </ProtectedRoute>
            } />
            <Route path="/admin/register" element={
              <ProtectedRoute requiredProfession="admin">
                <RegisterForm />
              </ProtectedRoute>
            } />
           

            {/* Doctor Routes */}
            <Route path="/doctor/dashboard" element={
              <ProtectedRoute requiredProfession="doctor">
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/doctor/patients" element={
              <ProtectedRoute requiredProfession="doctor">
                <PatientsList />
              </ProtectedRoute>
            } />
            <Route path="/doctor/appointments" element={
              <ProtectedRoute requiredProfession="doctor">
                <DoctorAppointments />
              </ProtectedRoute>
            } />
         

            {/* Nurse Routes */}
            <Route path="/nurse/dashboard" element={
              <ProtectedRoute requiredProfession="nurse">
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/nurse/records" element={
              <ProtectedRoute requiredProfession="nurse">
                <PatientRecords />
              </ProtectedRoute>
            } />
            <Route path="/nurse/vitals" element={
              <ProtectedRoute requiredProfession="nurse">
                <VitalsMonitoring />
              </ProtectedRoute>
            } />
           

         
           
            <Route path="/receptionist/register" element={
              <ProtectedRoute requiredProfession="receptionist">
                <NewRegistration />
              </ProtectedRoute>
            } />

            {/* Patient Routes */}
            <Route path="/patient/dashboard" element={
              <ProtectedRoute requiredProfession="patient">
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/patient/appointments" element={
              <ProtectedRoute requiredProfession="patient">
                <MyAppointments />
              </ProtectedRoute>
            } />
            <Route path="/patient/medical-history" element={
              <ProtectedRoute requiredProfession="patient">
                <PatientMedicalHistory />
              </ProtectedRoute>
            } />

            {/* Fallback route */}
            <Route path="*" element={
              <ProtectedRoute>
                <HospitalWebsite />
              </ProtectedRoute>
            } />
          </Routes>
        </MainLayout>
      ) : (
        <AuthLayout />
      )}
    </Box>
  );
}

export default App;