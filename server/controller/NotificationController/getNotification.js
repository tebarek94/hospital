import db from "../../config/db.config.js";

export default function getNotificationController(req, res) {
    const { user_id } = req.params; // Extracting user_id from request parameters

    // SQL query to fetch all notifications for a specific user
    const sql = "SELECT * FROM Notification WHERE user_id = ?";

    // Execute the SQL query
    db.query(sql, [user_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error fetching notifications",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Notifications fetched successfully", data: result });
    });
}