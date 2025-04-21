import db from "../../config/db.config.js";
export function getAllPatientController(req, res) {
  const sql = "SELECT * FROM Patient_Register"; // Ensure table name matches your database schema
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ 
        message: "Error retrieving patients", 
        error: err.message 
      });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "No patients found" });
    }

    return res.status(200).json({ 
      message: "Patients retrieved successfully", 
      data: result 
    });
  });
}

export default getAllPatientController;
