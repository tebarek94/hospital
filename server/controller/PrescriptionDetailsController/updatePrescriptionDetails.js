export default function updatePrescriptionDetailsController(req, res) {
    const { prescription_id } = req.params; // Extracting prescription_id from request parameters
    const { doctor_id, patient_id, pharmacy_id, insurance_id, prescription_date, medication_name, dosage, frequency } = req.body; // Extracting data from request body

    // SQL query to update a prescription record
    const sql = "UPDATE Prescription SET doctor_id = ?, patient_id = ?, pharmacy_id = ?, insurance_id = ?, prescription_date = ?, medication_name = ?, dosage = ?, frequency = ? WHERE prescription_id = ?";

    // Execute the SQL query
    db.query(sql, [doctor_id, patient_id, pharmacy_id, insurance_id, prescription_date, medication_name, dosage, frequency, prescription_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error updating prescription details",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Prescription details updated successfully", data: result });
    });
}