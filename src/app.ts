import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import apartmentRoutes from './routes/apartment.routes';
import { setupSwagger } from './swagger';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apartmentRoutes);

setupSwagger(app);

mongoose.connect(process.env.MONGO_URI || '')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

export default app;
