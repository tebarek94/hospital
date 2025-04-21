import db from '../config/db.config.js';

export const getPrescriptionsWithDetails = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT pr.*, p.F_name, p.L_name, ph.Drug_Name, pd.Dosage, pd.Duration
      FROM prescription pr
      JOIN patient_register p ON pr.PID = p.PID
      JOIN prescription_details pd ON pr.Prescription_ID = pd.Prescription_ID
      JOIN pharmacy ph ON pd.Drug_ID = ph.Drug_ID
    `);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};