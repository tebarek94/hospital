import db from "../../config/db.config.js";
export default function createEmergencyContactController(req, res) {
    const { emergency_contact_name, emergency_contact_number, relationship } = req.body; // Extracting data from request body

    // SQL query to insert a new emergency contact record
    const sql = "INSERT INTO EmergencyContact (emergency_contact_name, emergency_contact_number, relationship) VALUES (?, ?, ?)";

    // Execute the SQL query
    db.query(sql, [emergency_contact_name, emergency_contact_number, relationship], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error creating emergency contact",
                error: err.message
            });
        }

        return res.status(201).json({ message: "Emergency contact created successfully", data: result });
    });
}