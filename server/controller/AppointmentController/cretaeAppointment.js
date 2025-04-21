import db from "../../config/db.config.js"; // E
 export default function createAppointmentController(req, res) {
    const { patient_id, doctor_id, appointment_date, appointment_time } = req.body; // Extracting data from request body

    // SQL query to insert a new appointment record
    const sql = "INSERT INTO Appointment (patient_id, doctor_id, appointment_date, appointment_time) VALUES (?, ?, ?, ?)";

    // Execute the SQL query
    db.query(sql, [patient_id, doctor_id, appointment_date, appointment_time], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error creating appointment", 
                error: err.message 
            });
        }

        return res.status(201).json({ message: "Appointment created successfully", data: result });
    });
}