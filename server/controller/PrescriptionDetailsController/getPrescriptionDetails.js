export default function getPrescriptionDetailsController(req, res) {
    const { prescription_id } = req.params; // Extracting prescription_id from request parameters

    // SQL query to fetch prescription details
    const sql = "SELECT * FROM PrescriptionDetails WHERE prescription_id = ?";

    // Execute the SQL query
    db.query(sql, [prescription_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error fetching prescription details",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Prescription details fetched successfully", data: result });
    });
}