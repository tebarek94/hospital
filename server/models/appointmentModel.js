import db from "../config/db.config.js";
class Appointment {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM appointment");
    return rows;
  }

  static async getById(app_ID) {
    const [rows] = await db.query("SELECT * FROM appointment WHERE app_ID = ?", [app_ID]);
    return rows[0];
  }

  static async create(appointmentData) {
    const { PID, app_time, Status } = appointmentData;
    const [result] = await db.query(
      "INSERT INTO appointment (PID, app_time, Status) VALUES (?, ?, ?)",
      [PID, app_time, Status]
    );
    return { app_ID: result.insertId, ...appointmentData };
  }

  static async update(app_ID, appointmentData) {
    const { PID, app_time, Status } = appointmentData;
    await db.query(
      "UPDATE appointment SET PID = ?, app_time = ?, Status = ? WHERE app_ID = ?",
      [PID, app_time, Status, app_ID]
    );
    return { app_ID, ...appointmentData };
  }

  static async delete(app_ID) {
    await db.query("DELETE FROM appointment WHERE app_ID = ?", [app_ID]);
    return true;
  }

  // Get appointments with patient details
  static async getWithPatientDetails() {
    const [rows] = await db.query(`
      SELECT a.app_ID, p.PID, p.F_name, p.L_name, a.app_time, a.Status 
      FROM appointment a
      JOIN patient_register p ON a.PID = p.PID
    `);
    return rows;
  }
}

export default Appointment;