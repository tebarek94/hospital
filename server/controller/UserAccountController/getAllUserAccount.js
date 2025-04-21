import db from "../../config/db.config.js"; // E
export default function getAllUserAccountController(req, res) {
    const sql = "SELECT * FROM user_account"; // Ensure table name matches your database schema
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error retrieving user accounts", 
                error: err.message 
            });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "No user accounts found" });
        }

        return res.status(200).json({ 
            message: "User accounts retrieved successfully", 
            data: result 
        });
    });
}