import express from 'express';
import dotenv from "dotenv";
import patenteRoutes from './routes/patientesRoutes/patientesRoutes.js'; 
import db from './config/db.config.js';
import cors from 'cors';
import appointmentRoutes from './routes/appointementRoutes/appointementRoutes.js'; 
import userRoutes from './routes/userRoutes/useRoutes.js'; 
import hospitalRoutes from './routes/hospitalRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/patientes', patenteRoutes); 
app.use('/api/appointments', appointmentRoutes); 
app.use("/api/users",userRoutes);
// app.use("/api/appointmentss", appointmentRoutess);
app.use("/api", hospitalRoutes);



db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
    app.listen(PORT, () => {
        console.log(`Server is listening on http://localhost:${PORT}`);
    });
});
