import db from "../../config/db.config.js"; // E
export default function getAllAppointmentController(req, res) {
    const sql = `SELECT a.app_ID, p.PID, p.F_name, p.L_name, a.app_time, a.Status 
      FROM appointment a
      JOIN patient_register p ON a.PID = p.PID`; // Ensure table name matches your database schema
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error retrieving appointments", 
                error: err.message 
            });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "No appointments found" });
        }

        return res.status(200).json({ 
            message: "Appointments retrieved successfully", 
            data: result 
        });
    });
}