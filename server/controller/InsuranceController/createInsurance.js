import db from "../../config/db.config.js";
export default function createInsuranceController(req, res) {
    const { insurance_name, insurance_type, insurance_company, coverage_amount } = req.body; // Extracting data from request body

    // SQL query to insert a new insurance record
    const sql = "INSERT INTO Insurance (insurance_name, insurance_type, insurance_company, coverage_amount) VALUES (?, ?, ?, ?)";

    // Execute the SQL query
    db.query(sql, [insurance_name, insurance_type, insurance_company, coverage_amount], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error creating insurance",
                error: err.message
            });
        }

        return res.status(201).json({ message: "Insurance created successfully", data: result });
    });
}