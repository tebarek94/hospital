import db from "../../config/db.config.js"; // E
export default function updatePatientController(req, res) {{    
    const { id } = req.params; // Extracting the patient ID from the request parameters
    const { firstName, middleName, lastName, age, phone, region } = req.body; // Extracting patient details from the request body

    // Check if required fields are provided
    if (!firstName || !age || !phone || !region) {
        return res.status(400).json({ 
            message: "Missing required fields: firstName, age, phone, region" 
        });
    }

    // SQL query to update the patient record
    const sql = `
        UPDATE Patient_Register 
        SET F_name = ?, M_name = ?, L_name = ?, Age = ?, Phone_No = ?, Region = ? 
        WHERE id = ?
    `;

    // Execute the SQL query
    db.query(sql, [firstName, middleName, lastName, age, phone, region, id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error updating patient", 
                error: err.message 
            });
        }
        
        // Check if any rows were affected (i.e., if the update was successful)
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        return res.status(200).json({ 
            message: "Patient updated successfully", 
            data: { id, firstName, middleName, lastName, age, phone, region } 
        });
    });
}}