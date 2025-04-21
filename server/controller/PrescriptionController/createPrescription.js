import db from "../../config/db.config.js";
export default function createPrescriptionController(req, res) {
    const { patient_id, doctor_id, medication, dosage, frequency, duration } = req.body; // Extracting data from request body

    // SQL query to insert a new prescription record
    const sql = "INSERT INTO Prescription (patient_id, doctor_id, medication, dosage, frequency, duration) VALUES (?, ?, ?, ?, ?, ?)";

    // Execute the SQL query
    db.query(sql, [patient_id, doctor_id, medication, dosage, frequency, duration], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error creating prescription", 
                error: err.message 
            });
        }

        return res.status(201).json({ message: "Prescription created successfully", data: result });
    });
}