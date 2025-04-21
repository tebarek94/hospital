import db from "../../config/db.config.js"; // E
export default function updateLaboratoryController(req, res) {
    const { id } = req.params; // Extracting the laboratory ID from request parameters
    const { name, location, contact_number } = req.body; // Extracting data from request body

    // SQL query to update a laboratory record
    const sql = "UPDATE Laboratory SET name = ?, location = ?, contact_number = ? WHERE id = ?";

    // Execute the SQL query
    db.query(sql, [name, location, contact_number, id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error updating laboratory", 
                error: err.message 
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Laboratory not found" });
        }

        return res.status(200).json({ message: "Laboratory updated successfully" });
    });
}
