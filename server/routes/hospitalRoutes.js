import express from 'express';
import {
    getAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getEmergencyContacts,
    addEmergencyContact,
    updateEmergencyContact,
    deleteEmergencyContact,
    getInsuranceInfo,
    addInsuranceInfo,
    updateInsuranceInfo,
    deleteInsuranceInfo,
    getLabResults,
    addLabResult,
    updateLabResult,
    deleteLabResult,
    getPatientHistory,
    addPatientHistory,
    updatePatientHistory,
    deletePatientHistory,
    getPayments,
    addPayment,
    updatePayment,
    deletePayment,
    getPrescriptions,
    addPrescription,
    updatePrescription,
    deletePrescription,
    getPrescriptionDetails,
    addPrescriptionDetail,
    updatePrescriptionDetail,
    deletePrescriptionDetail,
    getStaffSchedules,
    addStaffSchedule,
    updateStaffSchedule,
    deleteStaffSchedule,
    getAuditLogs,
    getDepartmentsController,
    updateDepartmentController,
    deleteDepartmentController
} from '../controllers/hospitalController.js';

const router = express.Router();
router.get('/departments', getDepartmentsController);
router.get('/departments', updateDepartmentController);
router.delete('/departments/:id', deleteDepartmentController);
router.put('/departments/:id', updateDepartmentController);

// Appointment routes
router.get('/appointments', getAppointments);
router.post('/appointments', addAppointment);
router.put('/appointments/:id', updateAppointment);
router.delete('/appointments/:id', deleteAppointment);

// Emergency contact routes
router.get('/emergency-contacts', getEmergencyContacts);
router.post('/emergency-contacts', addEmergencyContact);
router.put('/emergency-contacts/:id', updateEmergencyContact);
router.delete('/emergency-contacts/:id', deleteEmergencyContact);

// Insurance information routes
router.get('/insurance-info', getInsuranceInfo);
router.post('/insurance-info', addInsuranceInfo);
router.put('/insurance-info/:id', updateInsuranceInfo);
router.delete('/insurance-info/:id', deleteInsuranceInfo);

// Lab result routes
router.get('/lab-results', getLabResults);
router.post('/lab-results', addLabResult);
router.put('/lab-results/:id', updateLabResult);
router.delete('/lab-results/:id', deleteLabResult);

// Patient history routes
router.get('/patient-history', getPatientHistory);
router.post('/patient-history', addPatientHistory);
router.put('/patient-history/:id', updatePatientHistory);
router.delete('/patient-history/:id', deletePatientHistory);

// Payment routes
router.get('/payments', getPayments);
router.post('/payments', addPayment);
router.put('/payments/:id', updatePayment);
router.delete('/payments/:id', deletePayment);

// Prescription routes
router.get('/prescriptions', getPrescriptions);
router.post('/prescriptions', addPrescription);
router.put('/prescriptions/:id', updatePrescription);
router.delete('/prescriptions/:id', deletePrescription);

// Prescription detail routes
router.get('/prescription-details', getPrescriptionDetails);
router.post('/prescription-details', addPrescriptionDetail);
router.put('/prescription-details/:id', updatePrescriptionDetail);
router.delete('/prescription-details/:id', deletePrescriptionDetail);

// Staff schedule routes
router.get('/staff-schedules', getStaffSchedules);
router.post('/staff-schedules', addStaffSchedule);
router.put('/staff-schedules/:id', updateStaffSchedule);
router.delete('/staff-schedules/:id', deleteStaffSchedule);

// Audit log routes
router.get('/audit-logs', getAuditLogs);

export default router;
