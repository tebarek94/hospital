import db from "../../config/db.config.js";
export default function updateDepartmentController(req, res) {
    const { department_id, department_name, department_head } = req.body; // Extracting data from request body

    // SQL query to update a department record
    const sql = "UPDATE Department SET department_name = ?, department_head = ? WHERE department_id = ?";

    // Execute the SQL query
    db.query(sql, [department_name, department_head, department_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error updating department",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Department updated successfully", data: result });
    });
}