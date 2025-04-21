import db from "../../config/db.config.js";
export default function createDepartmentController(req, res) {
    const { department_name, department_head } = req.body; // Extracting data from request body

    // SQL query to insert a new department record
    const sql = "INSERT INTO department (department_name, department_head) VALUES (?, ?)";

    // Execute the SQL query
    db.query(sql, [department_name, department_head], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error creating department",
                error: err.message
            });
        }

        return res.status(201).json({ message: "Department created successfully", data: result });
    });
}