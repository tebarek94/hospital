import db from "../../config/db.config.js"; // E
export default function updateAppointmentController(req, res) {
    const { id } = req.params; // Extracting the appointment ID from request parameters
    const { patient_id, doctor_id, appointment_date, appointment_time } = req.body; // Extracting data from request body

    // SQL query to update an existing appointment record
    const sql = "UPDATE Appointment SET patient_id = ?, doctor_id = ?, appointment_date = ?, appointment_time = ? WHERE id = ?";

    // Execute the SQL query
    db.query(sql, [patient_id, doctor_id, appointment_date, appointment_time, id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error updating appointment", 
                error: err.message 
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        return res.status(200).json({ message: "Appointment updated successfully" });
    });
}