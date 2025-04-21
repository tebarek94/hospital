import db from "../../config/db.config.js";
export default function deleteInsuranceController(req, res) {
    const { insurance_id } = req.params; // Extracting insurance ID from request parameters

    // SQL query to delete an insurance record by ID
    const sql = "DELETE FROM Insurance WHERE insurance_id = ?";

    // Execute the SQL query
    db.query(sql, [insurance_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error deleting insurance",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Insurance deleted successfully", data: result });
    });
}