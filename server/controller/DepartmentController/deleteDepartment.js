import db from "../../config/db.config.js";
export default function deleteDepartmentController(req, res) {
    const { department_id } = req.params; // Extracting department_id from request parameters

    // SQL query to delete a department record
    const sql = "DELETE FROM Department WHERE department_id = ?";

    // Execute the SQL query
    db.query(sql, [department_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error deleting department",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Department deleted successfully", data: result });
    });
}