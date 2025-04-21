import { Routes, Route, Navigate } from 'react-router-dom';
import HospitalWebsite from '../../page/HospitalWebsite';

export const AuthLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<HospitalWebsite />} />
    </Routes>
  );
};