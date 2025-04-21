import db from "../../config/db.config.js";

export default function updateNotificationController(req, res) {
    const { notification_id, user_id, notification_type, notification_message } = req.body; // Extracting data from request body

    // SQL query to update a notification record
    const sql = "UPDATE Notification SET user_id = ?, notification_type = ?, notification_message = ? WHERE notification_id = ?";

    // Execute the SQL query
    db.query(sql, [user_id, notification_type, notification_message, notification_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error updating notification",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Notification updated successfully", data: result });
    });
}