import db from "../../config/db.config.js";

export default function deleteNotificationController(req, res) {
    const { notification_id } = req.body; // Extracting data from request body

    // SQL query to delete a notification record
    const sql = "DELETE FROM Notification WHERE notification_id = ?";

    // Execute the SQL query
    db.query(sql, [notification_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error deleting notification",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Notification deleted successfully", data: result });
    });
}