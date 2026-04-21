import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import adminRoutes from './routes/admin.routes.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
dotenv.config();

const app = express();

app.use(helmet());
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', apiLimiter);

app.use(express.json());

connectDB();
app.use(cors({
    origin: "https://assignment-6v95.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/tasks', taskRoutes)
app.use('/api/v1/admin', adminRoutes)


const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})