import db from "../../config/db.config";
export default function updateBedInformationController(req, res) {
    const { bed_information_id, bed_information_name } = req.body; // Extracting data from request body

    // SQL query to update a bed information record
    const sql = "UPDATE BedInformation SET bed_information_name = ? WHERE bed_information_id = ?";

    // Execute the SQL query
    db.query(sql, [bed_information_name, bed_information_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error updating bed information",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Bed information updated successfully", data: result });
    });
}