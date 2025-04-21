import axios from 'axios';

const API_URL =`http://localhost:5000`;

const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Appointments API
export const getAppointments = async () => {
  const response = await api.get(`${API_URL}/api/appointments`);
  console.log(response.data);
  return response.data;
};

export const getAppointmentsWithPatients = async () => {
  const response = await api.get('/appointments/with-patients');
  return response.data;
};

export const getAppointmentsWithDoctors = async () => {
  const response = await api.get('/appointments/with-doctors');
  return response.data;
};

// Patients API
export const getPatientFullProfile = async (id) => {
  const response = await api.get(`/patients/${id}/full`);
  return response.data;
};
export const getLabResults = async () => {
    const response = await api.get(`${API_URL}/api/lab-results`);
    console.log(response.data);
    return response.data;
  };
  
  export const getLabResultsWithPatients = async () => {
    const response = await api.get('/laboratory/with-patients');
    return response.data;
  };
  
  export const createLabResult = async (labData) => {
    const response = await api.post('/laboratory', labData);
    return response.data;
  };

  // Add these prescription-related functions to your existing api.js
export const getPrescriptions = async () => {
    const response = await api.get('/prescriptions');
    return response.data;
  };
  
  export const getPrescriptionsWithDetails = async () => {
    const response = await api.get('/prescriptions/with-details');
    return response.data;
  };
  
  export const createPrescription = async (prescriptionData) => {
    const response = await api.post('/prescriptions', prescriptionData);
    return response.data;
  };
  
  export const updatePrescription = async (id, prescriptionData) => {
    const response = await api.put(`/prescriptions/${id}`, prescriptionData);
    return response.data;
  };