import db from "../../config/db.config.js";
export default function deleteEmergencyContactController(req, res) {
    const { contact_id } = req.params; // Extracting contact_id from request parameters

    // SQL query to delete an emergency contact record
    const sql = "DELETE FROM EmergencyContact WHERE contact_id = ?";

    // Execute the SQL query
    db.query(sql, [contact_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error deleting emergency contact",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Emergency contact deleted successfully", data: result });
    });
}