import db from "../../config/db.config.js";
export default function createScheduleController(req, res) {
    const { schedule_id, schedule_name, schedule_description, schedule_date } = req.body; // Extracting schedule details from request body

    // SQL query to insert a new schedule record
    const sql = "INSERT INTO Schedule (schedule_id, schedule_name, schedule_description, schedule_date) VALUES (?, ?, ?, ?)";

    // Execute the SQL query
    db.query(sql, [schedule_id, schedule_name, schedule_description, schedule_date], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error creating schedule",
                error: err.message
            });
        }

        return res.status(201).json({ message: "Schedule created successfully", data: result });
    });
}