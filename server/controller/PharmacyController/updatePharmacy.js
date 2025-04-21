import db from "../../config/db.config.js";
export default function updatePharmacyController(req, res) {
    const { pharmacy_name, pharmacy_location } = req.body; // Extracting data from request body
    const pharmacy_id = req.params.id; // Extracting pharmacy ID from request parameters

    // SQL query to update a pharmacy record
    const sql = "UPDATE Pharmacy SET pharmacy_name = ?, pharmacy_location = ? WHERE pharmacy_id = ?";

    // Execute the SQL query
    db.query(sql, [pharmacy_name, pharmacy_location, pharmacy_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error updating pharmacy",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Pharmacy updated successfully", data: result });
    });
}