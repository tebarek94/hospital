import db from "../config/db.config.js";

class Prescription {
  // ... basic CRUD operations

  // Get prescriptions with medication details
  static async getWithMedicationDetails() {
    const [rows] = await db.query(`
      SELECT pr.Prescription_ID, p.PID, p.F_name, p.L_name, 
             ph.Drug_Name, pd.Dosage, pd.Duration, ph.Price
      FROM prescription pr
      JOIN patient_register p ON pr.PID = p.PID
      JOIN prescription_details pd ON pr.Prescription_ID = pd.Prescription_ID
      JOIN pharmacy ph ON pd.Drug_ID = ph.Drug_ID
    `);
    return rows;
  }
}

export default Prescription;