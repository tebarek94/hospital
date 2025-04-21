export default function createPrescriptionDetailsController(req, res) {
    const { prescription_id, medicine_id, dosage, frequency } = req.body; // Extracting data from request body

    // SQL query to insert a new prescription details record
    const sql = "INSERT INTO PrescriptionDetails (prescription_id, medicine_id, dosage, frequency) VALUES (?, ?, ?, ?)";

    // Execute the SQL query
    db.query(sql, [prescription_id, medicine_id, dosage, frequency], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error creating prescription details",
                error: err.message
            });
        }

        return res.status(201).json({ message: "Prescription details created successfully", data: result });
    });
}