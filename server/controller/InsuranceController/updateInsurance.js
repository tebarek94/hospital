import db from "../../config/db.config.js";
export default function updateInsuranceController(req, res) {
    const { insurance_id, insurance_name, insurance_type, insurance_coverage } = req.body; // Extracting data from request body

    // SQL query to update an existing insurance record
    const sql = "UPDATE Insurance SET insurance_name = ?, insurance_type = ?, insurance_coverage = ? WHERE insurance_id = ?";

    // Execute the SQL query
    db.query(sql, [insurance_name, insurance_type, insurance_coverage, insurance_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error updating insurance",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Insurance updated successfully", data: result });
    });
}