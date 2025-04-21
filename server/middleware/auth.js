// import jwt from 'jsonwebtoken';
// import { promisify } from 'util';
// import db from '../config/db.config.js';

// const protect = async (req, res, next) => {
//   try {
//     // 1) Getting token and check if it's there
//     let token;
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith('Bearer')
//     ) {
//       token = req.headers.authorization.split(' ')[1];
//     }

//     if (!token) {
//       return res.status(401).json({
//         status: 'fail',
//         message: 'You are not logged in! Please log in to get access.',
//       });
//     }

//     // 2) Verification token
//     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//     // 3) Check if user still exists
//     const [rows] = await db.query('SELECT * FROM user_account WHERE SID = ?', [
//       decoded.id,
//     ]);
//     const currentUser = rows[0];

//     if (!currentUser) {
//       return res.status(401).json({
//         status: 'fail',
//         message: 'The user belonging to this token does no longer exist.',
//       });
//     }

//     // GRANT ACCESS TO PROTECTED ROUTE
//     req.user = currentUser;
//     next();
//   } catch (err) {
//     return res.status(401).json({
//       status: 'fail',
//       message: 'Invalid token! Please log in again.',
//     });
//   }
// };

// const restrictTo = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.Profession)) {
//       return res.status(403).json({
//         status: 'fail',
//         message: 'You do not have permission to perform this action',
//       });
//     }

//     next();
//   };
// };

// export { protect, restrictTo };