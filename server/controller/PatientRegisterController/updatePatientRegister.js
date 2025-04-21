import db from "../../config/db.config.js"; // E
export default function updatePatientRegisterController(req, res) {
    const { id } = req.params; // Extracting the patient ID from request parameters
    const { patient_id, doctor_id, appointment_date, status } = req.body; // Extracting data from the request body

    // SQL query to update a patient record
    const sql = `
        UPDATE Patient_Register 
        SET patient_id = ?, doctor_id = ?, appointment_date = ?, status = ? 
        WHERE id = ?
    `;

    // Execute the SQL query
    db.query(sql, [patient_id, doctor_id, appointment_date, status, id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error updating patient", 
                error: err.message 
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        return res.status(200).json({ 
            message: "Patient updated successfully", 
            data: { id, patient_id, doctor_id, appointment_date, status } 
        });
    });
}