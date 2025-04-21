import db from "../../config/db.config.js";
export default function deletePaymentModelController(req, res) {
    const { payment_model_id } = req.params; // Extracting payment_model_id from request parameters

    // SQL query to delete a payment model record
    const sql = "DELETE FROM PaymentModel WHERE payment_model_id = ?";

    // Execute the SQL query
    db.query(sql, [payment_model_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error deleting payment model",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Payment model not found" });
        }

        return res.status(200).json({ message: "Payment model deleted successfully" });
    });
}