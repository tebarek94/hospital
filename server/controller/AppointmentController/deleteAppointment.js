import db from "../../config/db.config.js"; // E
export default function deleteAppointmentController(req, res) {
    const { id } = req.params; // Extracting the appointment ID from request parameters

    // SQL query to delete an appointment record
    const sql = "DELETE FROM Appointment WHERE id = ?";

    // Execute the SQL query
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error deleting appointment", 
                error: err.message 
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        return res.status(200).json({ message: "Appointment deleted successfully" });
    });
}