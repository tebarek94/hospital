import db from "../../config/db.config.js";
export default function updateScheduleController(req, res) {
    const { schedule_id } = req.params; // Extracting schedule_id from request parameters
    const { schedule_name, schedule_time } = req.body; // Extracting schedule details from request body

    // SQL query to update a schedule record
    const sql = "UPDATE Schedule SET schedule_name = ?, schedule_time = ? WHERE schedule_id = ?";

    // Execute the SQL query
    db.query(sql, [schedule_name, schedule_time, schedule_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error updating schedule",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Schedule updated successfully", data: result });
    });
}