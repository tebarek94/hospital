import db from "../../config/db.config";
export default function getBedInformationController(req, res) {
    // SQL query to fetch all bed information records
    const sql = "SELECT * FROM BedInformation";

    // Execute the SQL query
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error fetching bed information",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Bed information fetched successfully", data: result });
    });
}