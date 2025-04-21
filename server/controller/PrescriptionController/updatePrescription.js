import db from "../../config/db.config.js";
export default function updatePrescriptionController(req, res) {
    const { prescription_id } = req.params; // Extracting prescription_id from request parameters
    const { patient_id, doctor_id, medication, dosage, frequency, duration } = req.body; // Extracting data from request body

    // SQL query to update a prescription record
    const sql = "UPDATE Prescription SET patient_id = ?, doctor_id = ?, medication = ?, dosage = ?, frequency = ?, duration = ? WHERE prescription_id = ?";

    // Execute the SQL query
    db.query(sql, [patient_id, doctor_id, medication, dosage, frequency, duration, prescription_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error updating prescription",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Prescription not found" });
        }

        return res.status(200).json({ message: "Prescription updated successfully", data: result });
    });
}