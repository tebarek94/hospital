import db from "../../config/db.config.js";
export default function updateEmergencyContactController(req, res) {
    const { emergency_contact_id } = req.params; // Extracting emergency_contact_id from request parameters
    const { contact_name, contact_number } = req.body; // Extracting data from request body

    // SQL query to update an emergency contact record
    const sql = "UPDATE EmergencyContact SET contact_name = ?, contact_number = ? WHERE emergency_contact_id = ?";

    // Execute the SQL query
    db.query(sql, [contact_name, contact_number, emergency_contact_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error updating emergency contact",
                error: err.message
            });
        }
        return res.status(200).json({ message: "Emergency contact updated successfully", data: result });
    });
}