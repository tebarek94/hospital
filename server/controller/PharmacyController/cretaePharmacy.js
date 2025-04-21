import db from "../../config/db.config.js";
export default function createPharmacyController(req, res) {
    const { pharmacy_name, pharmacy_location } = req.body; // Extracting data from request body

    // SQL query to insert a new pharmacy record
    const sql = "INSERT INTO Pharmacy (pharmacy_name, pharmacy_location) VALUES (?, ?)";

    // Execute the SQL query
    db.query(sql, [pharmacy_name, pharmacy_location], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error creating pharmacy",
                error: err.message
            });
        }

        return res.status(201).json({ message: "Pharmacy created successfully", data: result });
    });
}