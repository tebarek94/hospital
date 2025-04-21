import db from "../../config/db.config";
export default function deleteBedInformationController(req, res) {
    const { bed_information_id } = req.body; 

    const sql = "DELETE FROM BedInformation WHERE bed_information_id = ?";

    // Execute the SQL query
    db.query(sql, [bed_information_id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({
                message: "Error deleting bed information",
                error: err.message
            });
        }

        return res.status(200).json({ message: "Bed information deleted successfully", data: result });
    });
}