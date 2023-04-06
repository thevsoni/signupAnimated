import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'
import UserRouter from './Routes/UserRouter.js'
import { errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//connect db
connectDB();

// main routes
app.get('/', (req, res) => {
    res.send("API is runnning..")
})

// other routes
app.use('/api/users', UserRouter);

//error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running in http://localhost/${PORT}`);
})