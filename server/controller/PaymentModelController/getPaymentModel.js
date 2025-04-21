import db from "../../config/db.config.js";
export default function getPaymentModelController(req, res) {
    // SQL query to fetch all payment model records
    const sql = "SELECT * FROM PaymentModel";

    // Execute the SQL query
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error fetching payment models",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Payment models fetched successfully", data: result });
    });
}