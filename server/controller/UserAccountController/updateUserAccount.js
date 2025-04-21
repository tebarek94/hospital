import db from "../../config/db.config.js"; // E

export default function updateUserAccountController(req, res) {
    const { id } = req.params; // Extracting the user ID from request parameters
    const { Username, Password, Email } = req.body; // Extracting new data from request body

    // SQL query to update a user account, using 'SID' as the identifier
    const sql = "UPDATE user_account SET Username = ?, Password = ?, Email = ? WHERE SID = ?";

    // Execute the SQL query
    db.query(sql, [Username, Password, Email, id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error updating user account", 
                error: err.message 
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User account not found" });
        }

        return res.status(200).json({ message: "User account updated successfully" });
    });
}
