import db from "../../config/db.config.js"; // E
export default function createLaboratoryController(req, res) {
    const { name, location, contact_number } = req.body; // Extracting data from request body

    // SQL query to insert a new laboratory record
    const sql = "INSERT INTO Laboratory (name, location, contact_number) VALUES (?, ?, ?)";

    // Execute the SQL query
    db.query(sql, [name, location, contact_number], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error creating laboratory", 
                error: err.message 
            });
        }

        return res.status(201).json({ message: "Laboratory created successfully", data: result });
    });
}