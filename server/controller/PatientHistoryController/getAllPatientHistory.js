import db from "../../config/db.config.js"; // E
export default function getAllPatientHistoryController(req, res) {
    const sql = "SELECT * FROM Patient_History"; // Ensure table name matches your database schema
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error retrieving patient history", 
                error: err.message 
            });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "No patient history found" });
        }

        return res.status(200).json({ 
            message: "Patient history retrieved successfully", 
            data: result 
        });
    });
}