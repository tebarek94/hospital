import db from "../../config/db.config.js";

export default function createPaymentModelController(req, res) {
    const { payment_model_name } = req.body; // Extracting payment model name from request body

    // SQL query to insert a new payment model record
    const sql = "INSERT INTO PaymentModel (payment_model_name) VALUES (?)";

    // Execute the SQL query
    db.query(sql, [payment_model_name], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error creating payment model",
                error: err.message
            });
        }

        return res.status(201).json({ message: "Payment model created successfully", data: result });
    });
}