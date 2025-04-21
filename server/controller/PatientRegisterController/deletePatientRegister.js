import db from "../../config/db.config.js"; // E
export default function deletePatientRegisterController(req, res) {
    const { id } = req.params; // Extracting the patient ID from request parameters

    // SQL query to delete a patient record
    const sql = "DELETE FROM Patient_Register WHERE id = ?";

    // Execute the SQL query
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error deleting patient", 
                error: err.message 
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        return res.status(200).json({ message: "Patient deleted successfully" });
    });
}