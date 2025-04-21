import db from "../../config/db.config.js";
export default function updatePaymentModelController(req, res) {
    const { payment_model_id } = req.params; // Extracting payment model ID from request parameters
    const { payment_model_name } = req.body; // Extracting payment model name from request body

    // SQL query to update a payment model record
    const sql = "UPDATE PaymentModel SET payment_model_name = ? WHERE payment_model_id = ?";

    // Execute the SQL query
    db.query(sql, [payment_model_name, payment_model_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error updating payment model",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Payment model not found" });
        }

        return res.status(200).json({ message: "Payment model updated successfully", data: result });
    });
}