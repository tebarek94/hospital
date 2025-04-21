import db from "../config/db.config.js";

class History {
  // ... basic CRUD operations

  // Get history with doctor and nurse details
  static async getWithMedicalStaff() {
    const [rows] = await db.query(`
      SELECT h.History_ID, p.PID, p.F_name, p.L_name, h.Symptom, h.Disease_name, 
             d.Username AS Doctor, n.Username AS Nurse
      FROM patient_history h
      JOIN patient_register p ON h.P_Id = p.PID
      LEFT JOIN user_account d ON h.Doctor_ID = d.SID
      LEFT JOIN user_account n ON h.Nurse_ID = n.SID
    `);
    return rows;
  }
}

export default History;