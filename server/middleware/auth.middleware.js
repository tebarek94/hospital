import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided."
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid token"
    });
  }
}

export function authorize(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.profession)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You don't have permission to perform this action."
      });
    }
    next();
  };
}