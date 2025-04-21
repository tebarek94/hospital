import {
    FiHome, FiUser, FiUsers, FiSettings, FiActivity,
    FiCalendar, FiHeart, FiFileText, FiClock,
    FiFlask, FiPackage, FiCreditCard, FiLogIn
  } from 'react-icons/fi';
  
  export const getMenuItems = (profession) => {
    const commonItems = [
      { path: '/dashboard', label: 'Overview', icon: FiHome },
      { path: '/profile', label: 'My Profile', icon: FiUser },
    ];
  
    const roleBasedItems = {
      Admin: [
        { path: '/admin/users', label: 'User Management', icon: FiUsers },
        { path: '/admin/reports', label: 'System Reports', icon: FiFileText },
        { path: '/admin/settings', label: 'System Settings', icon: FiSettings },
        { path: '/admin/audit', label: 'Audit Logs', icon: FiActivity },
      ],
      Doctor: [
        { path: '/doctor/appointments', label: 'Appointments', icon: FiCalendar },
        { path: '/doctor/patients', label: 'Patients', icon: FiHeart },
        { path: '/doctor/prescriptions', label: 'Prescriptions', icon: FiFileText },
        { path: '/doctor/schedule', label: 'Schedule', icon: FiClock },
      ],
      'Lab Technician': [
        { path: '/lab/tests', label: 'Test Orders', icon: FiFlask },
        { path: '/lab/results', label: 'Results', icon: FiFileText },
        { path: '/lab/inventory', label: 'Inventory', icon: FiPackage },
      ],
      Receptionist: [
        { path: '/reception/appointments', label: 'Appointments', icon: FiCalendar },
        { path: '/reception/patients', label: 'Patient Registry', icon: FiUsers },
        { path: '/reception/billing', label: 'Billing', icon: FiCreditCard },
        { path: '/reception/checkin', label: 'Patient Check-In', icon: FiLogIn },
      ],
    };
  
    return [...commonItems, ...(roleBasedItems[profession] || [])];
  };
  
  export const getDashboardPath = (profession) => {
    const paths = {
      Admin: '/admin/dashboard',
      Doctor: '/doctor/dashboard',
      'Lab Technician': '/lab/dashboard',
      Receptionist: '/reception/dashboard',
    };
    return paths[profession] || '/dashboard';
  };

  export   const getRoleSpecificItems = (profession) => {
    const commonItems = [
      { path: '/dashboard', label: 'Overview', icon: 'dashboard' },
      { path: '/profile', label: 'My Profile', icon: 'user' },
    ];
  
    switch (profession) {
      case 'Admin':
        return [
          ...commonItems,
          { path: '/admin/users', label: 'User Management', icon: 'users' },
          { path: '/admin/reports', label: 'System Reports', icon: 'file-text' },
          { path: '/admin/settings', label: 'System Settings', icon: 'settings' },
          { path: '/admin/audit', label: 'Audit Logs', icon: 'activity' },
          { path: '/admin/check', label: 'Check payment', icon: 'activity' },
        ];
      
      case 'Doctor':
        return [
          ...commonItems,
          { path: '/doctor/appointments', label: 'My Appointments', icon: 'calendar' },
          { path: '/doctor/patients', label: 'My Patients', icon: 'heart' },
          { path: '/doctor/prescriptions', label: 'Prescriptions', icon: 'file-text' },
          { path: '/doctor/schedule', label: 'My Schedule', icon: 'clock' },
        ];
      
      case 'Lab Technician':
        return [
          ...commonItems,
          { path: '/lab/tests', label: 'Test Orders', icon: 'flask' },
          { path: '/lab/results', label: 'Test Results', icon: 'file-text' },
          { path: '/lab/inventory', label: 'Lab Inventory', icon: 'package' },
        ];
      
      case 'Receptionist':
        return [
          ...commonItems,
          { path: '/reception/appointments', label: 'Appointments', icon: 'calendar' },
          { path: '/reception/patients', label: 'Patient Registry', icon: 'users' },
          { path: '/reception/billing', label: 'Billing', icon: 'credit-card' },
          { path: '/reception/checkin', label: 'Patient Check-In', icon: 'log-in' },
        ];
      
      default:
        return commonItems;
    }
  };