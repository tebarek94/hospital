import db from "../../config/db.config.js";
export default function getDepartmentController(req, res) {
    // SQL query to fetch all department records
    const sql = "SELECT * FROM department";

    // Execute the SQL query
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error fetching department",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Department fetched successfully", data: result });
    });
}