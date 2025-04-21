import db from '../config/db.config.js';

export const getLabResultsWithPatients = async (req, res) => {
  try {
    const [results] = db.query(`
      SELECT l.*, p.F_name, p.L_name
      FROM laboratory l
      JOIN patient_register p ON l.PID = p.PID
    `);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createLabResult = async (req, res) => {
  try {
    const { PID, Lab_Type, Lab_result } = req.body;
    const [result] = db.query(
      'INSERT INTO laboratory (PID, Lab_Type, Lab_result) VALUES (?, ?, ?)',
      [PID, Lab_Type, Lab_result]
    );
    res.status(201).json({
      Lab_ID: result.insertId,
      PID,
      Lab_Type,
      Lab_result,
      createdAt: new Date()
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};