import db from "../../config/db.config.js";
export default function deleteLaboratoryController(req, res) {
    const { id } = req.params; // Extracting the laboratory ID from request parameters

    // SQL query to delete a laboratory record
    const sql = "DELETE FROM Laboratory WHERE id = ?";

    // Execute the SQL query
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ 
                message: "Error deleting laboratory", 
                error: err.message 
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Laboratory not found" });
        }

        return res.status(200).json({ message: "Laboratory deleted successfully" });
    });
}

