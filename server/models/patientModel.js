import db from "../config/db.config.js";

class Patient {
  // Basic CRUD operations
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM patient_register");
    return rows;
  }

  static async getById(PID) {
    const [rows] = await db.query("SELECT * FROM patient_register WHERE PID = ?", [PID]);
    return rows[0];
  }

  // Get patient with emergency contacts
  static async getWithEmergencyContacts(PID) {
    const [rows] = await db.query(`
      SELECT p.*, e.Contact_Name, e.Relationship, e.Phone_No
      FROM patient_register p
      LEFT JOIN emergency_contact e ON p.PID = e.PID
      WHERE p.PID = ?
    `, [PID]);
    return rows;
  }

  // Get patient with insurance
  static async getWithInsurance(PID) {
    const [rows] = await db.query(`
      SELECT p.*, i.Insurance_Provider, i.Policy_Number, i.Coverage_Amount
      FROM patient_register p
      LEFT JOIN insurance i ON p.PID = i.PID
      WHERE p.PID = ?
    `, [PID]);
    return rows;
  }

  // Get patient full profile (with all related data)
  static async getFullProfile(PID) {
    const [patient] = await db.query("SELECT * FROM patient_register WHERE PID = ?", [PID]);
    const [emergencyContacts] = await db.query("SELECT * FROM emergency_contact WHERE PID = ?", [PID]);
    const [insurance] = await db.query("SELECT * FROM insurance WHERE PID = ?", [PID]);
    const [appointments] = await db.query("SELECT * FROM appointment WHERE PID = ?", [PID]);
    const [history] = await db.query("SELECT * FROM patient_history WHERE P_Id = ?", [PID]);
    const [payments] = await db.query("SELECT * FROM paymentmodel WHERE PID = ?", [PID]);

    return {
      ...patient[0],
      emergencyContacts,
      insurance: insurance[0],
      appointments,
      history,
      payments
    };
  }
}

export default Patient;