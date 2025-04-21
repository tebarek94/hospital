import db from "../../config/db.config.js"; // E
export default function updatePatientHistoryController(req, res) {
    const { id } = req.params; // Extracting the patient history ID from request parameters
    const { patient_id, doctor_id, date, symptoms, diagnosis, treatment } = req.body; // Extracting data from request body

    // SQL query to update a patient history record
    const sql = "UPDATE Patient_History SET patient_id = ?, doctor_id = ?, date = ?, symptoms = ?, diagnosis = ?, treatment = ? WHERE id = ?";

    // Execute the SQL query
    db.query(sql, [patient_id, doctor_id, date, symptoms, diagnosis, treatment, id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error updating patient history", 
                error: err.message 
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Patient history not found" });
        }

        return res.status(200).json({ message: "Patient history updated successfully" });
    });
}