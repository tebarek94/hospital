import db from "../../config/db.config.js";
export default function deletePharmacyController(req, res) {
    const { pharmacy_id } = req.params; // Extracting pharmacy ID from request parameters

    // SQL query to delete a pharmacy record by ID
    const sql = "DELETE FROM Pharmacy WHERE pharmacy_id = ?";

    // Execute the SQL query
    db.query(sql, [pharmacy_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error deleting pharmacy",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Pharmacy deleted successfully", data: result });
    });
}