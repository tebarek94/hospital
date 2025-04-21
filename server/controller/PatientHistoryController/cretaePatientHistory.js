import db from "../../config/db.config.js"; // E
export default function createPatientHistoryController(req, res) {
    const { patientId, doctorId, medicalHistory, treatmentPlan } = req.body; // Extracting data from request body

    // SQL query to insert a new patient history record
    const sql = "INSERT INTO Patient_History (patient_id, doctor_id, medical_history, treatment_plan) VALUES (?, ?, ?, ?)";

    // Execute the SQL query
    db.query(sql, [patientId, doctorId, medicalHistory, treatmentPlan], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error creating patient history", 
                error: err.message 
            });
        }

        return res.status(201).json({ 
            message: "Patient history created successfully", 
            data: { id: result.insertId, patientId, doctorId, medicalHistory, treatmentPlan } 
        });
    });
}