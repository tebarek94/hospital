import db from "../../config/db.config.js";

export default function deleteScheduleController(req, res) {
    const { schedule_id } = req.params; // Extracting schedule_id from request parameters

    // SQL query to delete a schedule record
    const sql = "DELETE FROM Schedule WHERE schedule_id = ?";

    // Execute the SQL query
    db.query(sql, [schedule_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error deleting schedule",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Schedule deleted successfully", data: result });
    });
}