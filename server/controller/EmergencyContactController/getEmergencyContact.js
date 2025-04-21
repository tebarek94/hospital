import db from "../../config/db.config.js";
export default function getEmergencyContactController(req, res) {
    const { emergency_contact_id } = req.params; // Extracting emergency_contact_id from request parameters

    // SQL query to fetch emergency contact details
    const sql = "SELECT * FROM EmergencyContact WHERE emergency_contact_id = ?";

    // Execute the SQL query
    db.query(sql, [emergency_contact_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error fetching emergency contact details",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Emergency contact details fetched successfully", data: result });
    });
}