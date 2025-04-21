import db from "../../config/db.config.js";
export default function deletePrescriptionController(req, res) {
    const { prescription_id } = req.params; // Extracting prescription_id from request parameters

    // SQL query to delete a prescription record
    const sql = "DELETE FROM Prescription WHERE prescription_id = ?";

    // Execute the SQL query
    db.query(sql, [prescription_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error deleting prescription",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Prescription not found" });
        }

        return res.status(200).json({ message: "Prescription deleted successfully" });
    });
}