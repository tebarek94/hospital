import db from "../../config/db.config.js";
export default function insertPatientRegisterController(req, res) { 
    const { firstName, middleName, lastName, age, phoneNo, region } = req.body; // Extracting data from the request body

    // Validate required fields
    if (!firstName || !age || !phoneNo || !region) {
        return res.status(400).json({ 
            message: "Missing required fields: firstName, age, phoneNo, region" 
        });
    }

    // SQL query to insert a new patient record
    const sql = `
        INSERT INTO Patient_Register (F_name, M_name, L_name, Age, Phone_No, Region) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    // Execute the SQL query
    db.query(sql, [firstName, middleName, lastName, age, phoneNo, region], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error inserting patient", 
                error: err.message 
            });
        }

        return res.status(201).json({ 
            message: "Patient registered successfully", 
            data: { id: result.insertId, firstName, middleName, lastName, age, phoneNo, region } 
        });
    });
}
