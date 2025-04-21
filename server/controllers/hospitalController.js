import db from '../config/db.config.js';

// Get all appointments
export const getAppointments = async (req, res) => {
    try {
        const query = `
            SELECT a.app_ID, p.PID, p.F_name, p.L_name, a.app_time, a.Status 
            FROM appointment a
            JOIN patient_register p ON a.PID = p.PID
        `;
        const [results] = await db.promise().query(query);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get emergency contacts
export const getEmergencyContacts = async (req, res) => {
    try {
        const query = `
            SELECT e.Contact_ID, p.PID, p.F_name, p.L_name, e.Contact_Name, e.Relationship, e.Phone_No
            FROM emergency_contact e
            JOIN patient_register p ON e.PID = p.PID
        `;
        const [results] = await db.promise().query(query);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get insurance information
export const getInsuranceInfo = async (req, res) => {
    try {
        const query = `
            SELECT i.Insurance_ID, p.PID, p.F_name, p.L_name, i.Insurance_Provider, i.Policy_Number, i.Coverage_Amount
            FROM insurance i
            JOIN patient_register p ON i.PID = p.PID
        `;
        const [results] = await db.promise().query(query);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get laboratory results
export const getLabResults = async (req, res) => {
    try {
        const query = `
            SELECT l.Lab_ID, p.PID, p.F_name, p.L_name, l.Lab_Type, l.Lab_result
            FROM laboratory l
            JOIN patient_register p ON l.PID = p.PID
        `;
        const [results] = await db.promise().query(query);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get patient history
export const getPatientHistory = async (req, res) => {
    try {
        const query = `
            SELECT h.History_ID, p.PID, p.F_name, p.L_name, h.Symptom, h.Disease_name, 
                   d.Username AS Doctor, n.Username AS Nurse
            FROM patient_history h
            JOIN patient_register p ON h.P_Id = p.PID
            LEFT JOIN user_account d ON h.Doctor_ID = d.SID
            LEFT JOIN user_account n ON h.Nurse_ID = n.SID
        `;
        const [results] = await db.promise().query(query);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get payments
export const getPayments = async (req, res) => {
    try {
        const query = `
            SELECT pm.Bill_ID, p.PID, p.F_name, p.L_name, pm.Total, pm.Pay_method
            FROM paymentmodel pm
            JOIN patient_register p ON pm.PID = p.PID
        `;
        const [results] = await db.promise().query(query);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get prescriptions
export const getPrescriptions = async (req, res) => {
    try {
        const query = `
            SELECT pr.Prescription_ID, p.PID, p.F_name, p.L_name, pr.Prescription, u.Username AS Doctor
            FROM prescription pr
            JOIN patient_register p ON pr.PID = p.PID
            LEFT JOIN user_account u ON pr.Doctor_ID = u.SID
        `;
        const [results] = await db.promise().query(query);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get prescription details
export const getPrescriptionDetails = async (req, res) => {
    try {
        const query = `
            SELECT pd.PrescriptionDetail_ID, pr.Prescription_ID, ph.Drug_Name, pd.Dosage, pd.Duration, ph.Price
            FROM prescription_details pd
            JOIN prescription pr ON pd.Prescription_ID = pr.Prescription_ID
            JOIN pharmacy ph ON pd.Drug_ID = ph.Drug_ID
        `;
        const [results] = await db.promise().query(query);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get staff schedules
export const getStaffSchedules = async (req, res) => {
    try {
        const query = `
            SELECT s.Schedule_ID, u.SID, u.Username, u.Profession, s.Shift_Start, s.Shift_End
            FROM schedule s
            JOIN user_account u ON s.User_ID = u.SID
        `;
        const [results] = await db.promise().query(query);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get audit logs
export const getAuditLogs = async (req, res) => {
    try {
        const query = `
            SELECT a.Log_ID, u.SID, u.Username, u.Profession, a.Action, a.Timestamp
            FROM audit_log a
            JOIN user_account u ON a.User_ID = u.SID
        `;
        const [results] = await db.promise().query(query);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// ========== Appointments ==========
export const addAppointment = async (req, res) => {
    const { PID, app_time, Status } = req.body;
    try {
        const query = `
            INSERT INTO appointment (PID, app_time, Status)
            VALUES (?, ?, ?)
        `;
        const [result] = await db.promise().execute(query, [PID, app_time, Status]);
        res.status(201).json({ message: "Appointment added successfully", id: result.insertId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateAppointment = async (req, res) => {
    const { app_ID, app_time, Status } = req.body;
    try {
        const query = `
            UPDATE appointment
            SET app_time = ?, Status = ?
            WHERE app_ID = ?
        `;
        await db.promise().execute(query, [app_time, Status, app_ID]);
        res.status(200).json({ message: "Appointment updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteAppointment = async (req, res) => {
    const { app_ID } = req.params;
    try {
        const query = `
            DELETE FROM appointment
            WHERE app_ID = ?
        `;
        await db.promise().execute(query, [app_ID]);
        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ========== Emergency Contacts ==========
export const addEmergencyContact = async (req, res) => {
    const { PID, Contact_Name, Relationship, Phone_No } = req.body;
    try {
        const query = `
            INSERT INTO emergency_contact (PID, Contact_Name, Relationship, Phone_No)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.promise().execute(query, [PID, Contact_Name, Relationship, Phone_No]);
        res.status(201).json({ message: "Emergency contact added successfully", id: result.insertId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateEmergencyContact = async (req, res) => {
    const { Contact_ID, Contact_Name, Relationship, Phone_No } = req.body;
    try {
        const query = `
            UPDATE emergency_contact
            SET Contact_Name = ?, Relationship = ?, Phone_No = ?
            WHERE Contact_ID = ?
        `;
        await db.promise().execute(query, [Contact_Name, Relationship, Phone_No, Contact_ID]);
        res.status(200).json({ message: "Emergency contact updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteEmergencyContact = async (req, res) => {
    const { Contact_ID } = req.params;
    try {
        const query = `
            DELETE FROM emergency_contact
            WHERE Contact_ID = ?
        `;
        await db.promise().execute(query, [Contact_ID]);
        res.status(200).json({ message: "Emergency contact deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ========== Insurance Information ==========
export const addInsuranceInfo = async (req, res) => {
    const { PID, Insurance_Provider, Policy_Number, Coverage_Amount } = req.body;
    try {
        const query = `
            INSERT INTO insurance (PID, Insurance_Provider, Policy_Number, Coverage_Amount)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.promise().execute(query, [PID, Insurance_Provider, Policy_Number, Coverage_Amount]);
        res.status(201).json({ message: "Insurance info added successfully", id: result.insertId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateInsuranceInfo = async (req, res) => {
    const { Insurance_ID, Insurance_Provider, Policy_Number, Coverage_Amount } = req.body;
    try {
        const query = `
            UPDATE insurance
            SET Insurance_Provider = ?, Policy_Number = ?, Coverage_Amount = ?
            WHERE Insurance_ID = ?
        `;
        await db.promise().execute(query, [Insurance_Provider, Policy_Number, Coverage_Amount, Insurance_ID]);
        res.status(200).json({ message: "Insurance info updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteInsuranceInfo = async (req, res) => {
    const { Insurance_ID } = req.params;
    try {
        const query = `
            DELETE FROM insurance
            WHERE Insurance_ID = ?
        `;
        await db.promise().execute(query, [Insurance_ID]);
        res.status(200).json({ message: "Insurance info deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ========== Laboratory Results ==========
export const addLabResult = async (req, res) => {
    const { PID, Lab_Type, Lab_result } = req.body;
    try {
        const query = `
            INSERT INTO laboratory (PID, Lab_Type, Lab_result)
            VALUES (?, ?, ?)
        `;
        const [result] = await db.promise().execute(query, [PID, Lab_Type, Lab_result]);
        res.status(201).json({ message: "Lab result added successfully", id: result.insertId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateLabResult = async (req, res) => {
    const { Lab_ID, Lab_Type, Lab_result } = req.body;
    try {
        const query = `
            UPDATE laboratory
            SET Lab_Type = ?, Lab_result = ?
            WHERE Lab_ID = ?
        `;
        await db.promise().execute(query, [Lab_Type, Lab_result, Lab_ID]);
        res.status(200).json({ message: "Lab result updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteLabResult = async (req, res) => {
    const { Lab_ID } = req.params;
    try {
        const query = `
            DELETE FROM laboratory
            WHERE Lab_ID = ?
        `;
        await db.promise().execute(query, [Lab_ID]);
        res.status(200).json({ message: "Lab result deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Repeat the same pattern for other entities (patient history, payments, prescriptions, prescription details, staff schedules, and audit logs).
// Insert new patient history
export const addPatientHistory = async (req, res) => {
    const { PID, Symptom, Disease_name, Doctor_ID, Nurse_ID } = req.body;
    try {
        const query = `
            INSERT INTO patient_history (P_Id, Symptom, Disease_name, Doctor_ID, Nurse_ID)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.promise().execute(query, [PID, Symptom, Disease_name, Doctor_ID, Nurse_ID]);
        res.status(201).json({ message: "Patient history added successfully", id: result.insertId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update patient history
export const updatePatientHistory = async (req, res) => {
    const { History_ID, Symptom, Disease_name, Doctor_ID, Nurse_ID } = req.body;
    try {
        const query = `
            UPDATE patient_history
            SET Symptom = ?, Disease_name = ?, Doctor_ID = ?, Nurse_ID = ?
            WHERE History_ID = ?
        `;
        await db.promise().execute(query, [Symptom, Disease_name, Doctor_ID, Nurse_ID, History_ID]);
        res.status(200).json({ message: "Patient history updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete patient history
export const deletePatientHistory = async (req, res) => {
    const { History_ID } = req.params;
    try {
        const query = `
            DELETE FROM patient_history
            WHERE History_ID = ?
        `;
        await db.promise().execute(query, [History_ID]);
        res.status(200).json({ message: "Patient history deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Insert new payment
export const addPayment = async (req, res) => {
    const { PID, Total, Pay_method } = req.body;
    try {
        const query = `
            INSERT INTO paymentmodel (PID, Total, Pay_method)
            VALUES (?, ?, ?)
        `;
        const [result] = await db.promise().execute(query, [PID, Total, Pay_method]);
        res.status(201).json({ message: "Payment added successfully", id: result.insertId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update payment
export const updatePayment = async (req, res) => {
    const { Bill_ID, Total, Pay_method } = req.body;
    try {
        const query = `
            UPDATE paymentmodel
            SET Total = ?, Pay_method = ?
            WHERE Bill_ID = ?
        `;
        await db.promise().execute(query, [Total, Pay_method, Bill_ID]);
        res.status(200).json({ message: "Payment updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete payment
export const deletePayment = async (req, res) => {
    const { Bill_ID } = req.params;
    try {
        const query = `
            DELETE FROM paymentmodel
            WHERE Bill_ID = ?
        `;
        await db.promise().execute(query, [Bill_ID]);
        res.status(200).json({ message: "Payment deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Insert new prescription
export const addPrescription = async (req, res) => {
    const { PID, Prescription, Doctor_ID } = req.body;
    try {
        const query = `
            INSERT INTO prescription (PID, Prescription, Doctor_ID)
            VALUES (?, ?, ?)
        `;
        const [result] = await db.promise().execute(query, [PID, Prescription, Doctor_ID]);
        res.status(201).json({ message: "Prescription added successfully", id: result.insertId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update prescription
export const updatePrescription = async (req, res) => {
    const { Prescription_ID, Prescription, Doctor_ID } = req.body;
    try {
        const query = `
            UPDATE prescription
            SET Prescription = ?, Doctor_ID = ?
            WHERE Prescription_ID = ?
        `;
        await db.promise().execute(query, [Prescription, Doctor_ID, Prescription_ID]);
        res.status(200).json({ message: "Prescription updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete prescription
export const deletePrescription = async (req, res) => {
    const { Prescription_ID } = req.params;
    try {
        const query = `
            DELETE FROM prescription
            WHERE Prescription_ID = ?
        `;
        await db.promise().execute(query, [Prescription_ID]);
        res.status(200).json({ message: "Prescription deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Insert new prescription detail
export const addPrescriptionDetail = async (req, res) => {
    const { Prescription_ID, Drug_ID, Dosage, Duration } = req.body;
    try {
        const query = `
            INSERT INTO prescription_details (Prescription_ID, Drug_ID, Dosage, Duration)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.promise().execute(query, [Prescription_ID, Drug_ID, Dosage, Duration]);
        res.status(201).json({ message: "Prescription detail added successfully", id: result.insertId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update prescription detail
export const updatePrescriptionDetail = async (req, res) => {
    const { PrescriptionDetail_ID, Dosage, Duration } = req.body;
    try {
        const query = `
            UPDATE prescription_details
            SET Dosage = ?, Duration = ?
            WHERE PrescriptionDetail_ID = ?
        `;
        await db.promise().execute(query, [Dosage, Duration, PrescriptionDetail_ID]);
        res.status(200).json({ message: "Prescription detail updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete prescription detail
export const deletePrescriptionDetail = async (req, res) => {
    const { PrescriptionDetail_ID } = req.params;
    try {
        const query = `
            DELETE FROM prescription_details
            WHERE PrescriptionDetail_ID = ?
        `;
        await db.promise().execute(query, [PrescriptionDetail_ID]);
        res.status(200).json({ message: "Prescription detail deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Insert new staff schedule
export const addStaffSchedule = async (req, res) => {
    const { User_ID, Shift_Start, Shift_End } = req.body;
    try {
        const query = `
            INSERT INTO schedule (User_ID, Shift_Start, Shift_End)
            VALUES (?, ?, ?)
        `;
        const [result] = await db.promise().execute(query, [User_ID, Shift_Start, Shift_End]);
        res.status(201).json({ message: "Staff schedule added successfully", id: result.insertId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update staff schedule
export const updateStaffSchedule = async (req, res) => {
    const { Schedule_ID, Shift_Start, Shift_End } = req.body;
    try {
        const query = `
            UPDATE schedule
            SET Shift_Start = ?, Shift_End = ?
            WHERE Schedule_ID = ?
        `;
        await db.promise().execute(query, [Shift_Start, Shift_End, Schedule_ID]);
        res.status(200).json({ message: "Staff schedule updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete staff schedule
export const deleteStaffSchedule = async (req, res) => {
    const { Schedule_ID } = req.params;
    try {
        const query = `
            DELETE FROM schedule
            WHERE Schedule_ID = ?
        `;
        await db.promise().execute(query, [Schedule_ID]);
        res.status(200).json({ message: "Staff schedule deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export  function getDepartmentsController(req, res) {
    const sql = "SELECT * FROM department";

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching departments:", err);
            return res.status(500).json({
                message: "Error fetching departments",
                error: err.message
            });
        }

        return res.status(200).json({ data: result });
    });
}


export  function createDepartmentController(req, res) {
    const { Dept_Name, Dept_Description } = req.body;

    const sql = "INSERT INTO department (Dept_Name, Dept_Description) VALUES (?, ?)";

    db.query(sql, [Dept_Name, Dept_Description], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error creating department",
                error: err.message
            });
        }

        return res.status(201).json({ message: "Department created successfully", data: result });
    });
}
export  function updateDepartmentController(req, res) {
    const { id, Dept_Name, department_head } = req.body;

    const sql = "UPDATE department SET Dept_Name = ?, Dept_Description = ? WHERE Dept_ID = ?";

    db.query(sql, [Dept_Name, department_head, id], (err, result) => {
        if (err) {
            console.error("Error updating department:", err);
            return res.status(500).json({
                message: "Error updating department",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Department updated successfully", data: result });
    });
}
export  function deleteDepartmentController(req, res) {
    const { id } = req.body;

    const sql = "DELETE FROM department WHERE Dept_ID = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting department:", err);
            return res.status(500).json({
                message: "Error deleting department",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Department deleted successfully", data: result });
    });
}