import db from "../../config/db.config.js";
export function createPatientes(req, res) {
    const { firstName, middleName, lastName, age, phone, region } = req.body;
    
    if (!firstName || !age || !phone || !region) {
        return res.status(400).json({ 
            message: "Missing required fields: firstName, age, phone, region" 
        });
    }
    
    const sql = `
        INSERT INTO Patient_Register (F_name, M_name, L_name, Age, Phone_No, Region) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    db.query(sql, [firstName, middleName, lastName, age, phone, region], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error inserting patient", 
                error: err.message 
            });
        }
        return res.status(201).json({ 
            message: "Patient inserted successfully", 
            data: { id: result.insertId, firstName, middleName, lastName, age, phone, region } 
        });
    });
}
