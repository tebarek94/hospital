import db from "../config/db.config.js";

class Laboratory {
  static async getWithPatientDetails() {
    const [rows] = await db.query(`
      SELECT l.Lab_ID, p.PID, p.F_name, p.L_name, l.Lab_Type, l.Lab_result
      FROM laboratory l
      JOIN patient_register p ON l.PID = p.PID
    `);
    return rows;
  }
}

export default Laboratory;