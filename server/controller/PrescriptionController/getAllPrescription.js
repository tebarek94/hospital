import db from "../../config/db.config.js";
export default function getAllPrescriptionController(req, res) {
    // SQL query to fetch all prescription records
    const sql = "SELECT * FROM Prescription";

    // Execute the SQL query
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error fetching prescriptions",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Prescriptions fetched successfully", data: result });
    });
}