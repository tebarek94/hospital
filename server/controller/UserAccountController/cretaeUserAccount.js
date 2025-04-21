import db from "../../config/db.config.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Input validation helper
const validateInput = (data) => {
  const errors = [];
  if (!data.Username || data.Username.length < 3) {
    errors.push('Username must be at least 3 characters');
  }
  if (!data.Password || data.Password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  if (!data.Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.Email)) {
    errors.push('Valid email is required');
  }
  if (!data.Profession || !['Admin', 'Doctor', 'Nurse', 'Receptionist', 'LabTechnician', 'Pharmacist', 'Patient'].includes(data.Profession)) {
    errors.push('Valid profession is required');
  }
  return errors;
};

export default async function createUserAccountController(req, res) {
  try {
    const { Username, Password, Email, Profession } = req.body;

    // Validate input
    const validationErrors = validateInput(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors
      });
    }

    // Check if user already exists
    const [existingUser] = await db.promise().query(
      "SELECT * FROM user_account WHERE Username = ? OR Email = ?",
      [Username, Email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        message: "User already exists",
        error: "Username or email already in use"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(Password, 12);

    // Create user
    const [result] = await db.promise().query(
      "INSERT INTO user_account (Username, Password, Email, Profession) VALUES (?, ?, ?, ?)",
      [Username, hashedPassword, Email, Profession]
    );

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: result.insertId,
        Username,
        Profession,
        Email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Changed from 1s to 1h for practical use
    );

    return res.status(201).json({
      success: true,
      message: "User account created successfully",
      data: {
        id: result.insertId,
        Username,
        Email,
        Profession
      },
      token
    });

  } catch (error) {
    console.error("Error in createUserAccountController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}
export async function loginUserController(req, res) {
  try {
    const { Username, Password } = req.body;

    if (!Username || !Password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required"
      });
    }

    // Find user
    const [users] = await db.promise().query(
      "SELECT * FROM user_account WHERE Username = ?",
      [Username]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const user = users[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.SID || user.id, // Using SID if it exists, otherwise fall back to id
        Username: user.Username,
        Profession: user.Profession,
        Email: user.Email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Changed from 1s to 1h for practical use
    );

    // Return user data without password
    const { Password: _, ...userData } = user;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: userData,
      token,
      profession: user.Profession // Added profession in the response
    });

  } catch (error) {
    console.error("Error in loginUserController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}
