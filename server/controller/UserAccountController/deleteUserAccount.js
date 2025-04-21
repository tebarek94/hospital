import db from "../../config/db.config.js"; // E
export default function deleteUserAccountController(req, res) {
    const { id } = req.params; // Extracting the user ID from request parameters

    // SQL query to delete a user account
    const sql = "DELETE FROM user_account WHERE SID = ?";

    // Execute the SQL query
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error deleting user account", 
                error: err.message 
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User account not found" });
        }

        return res.status(200).json({ message: "User account deleted successfully" });
    });
}