import db from "../../config/db.config.js";

export default function createNotificationController(req, res) {
    const { user_id, notification_type, notification_message } = req.body; // Extracting data from request body

    // SQL query to insert a new notification record
    const sql = "INSERT INTO Notification (user_id, notification_type, notification_message) VALUES (?, ?, ?)";

    // Execute the SQL query
    db.query(sql, [user_id, notification_type, notification_message], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error creating notification",
                error: err.message
            });
        }

        return res.status(201).json({ message: "Notification created successfully", data: result });
    });
}