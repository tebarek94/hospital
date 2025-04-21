import db from "../../config/db.config.js"; // E
export default function getAllLaboratoryController(req, res) {
    const sql = "SELECT * FROM Laboratory"; // Ensure table name matches your database schema
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error retrieving laboratories", 
                error: err.message 
            });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "No laboratories found" });
        }

        return res.status(200).json({ 
            message: "Laboratories retrieved successfully", 
            data: result 
        });
    });
}