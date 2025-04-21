import db from "../../config/db.config.js";
export default function getInsuranceController(req, res) {
    // SQL query to fetch all insurance records
    const sql = "SELECT * FROM Insurance";

    // Execute the SQL query
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error fetching insurance",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Insurance fetched successfully", data: result });
    });
}