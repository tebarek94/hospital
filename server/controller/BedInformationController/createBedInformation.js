import db from "../../config/db.config";
export default function createBedInformationController(req, res) {
    const { bed_information_name } = req.body; // Extracting bed information name from request body

    // SQL query to insert a new bed information record
    const sql = "INSERT INTO BedInformation (bed_information_name) VALUES (?)";

    // Execute the SQL query
    db.query(sql, [bed_information_name], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error creating bed information",
                error: err.message
            });
        }

        return res.status(201).json({ message: "Bed information created successfully", data: result });
    });
}