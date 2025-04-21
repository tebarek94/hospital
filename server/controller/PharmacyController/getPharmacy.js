import db from "../../config/db.config.js";
export default function getPharmacyController(req, res) {
    // SQL query to fetch all pharmacy records
    const sql = "SELECT * FROM Pharmacy";

    // Execute the SQL query
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error fetching pharmacy",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Pharmacy fetched successfully", data: result });
    });
}