import express from 'express';
import dotenv from 'dotenv';
import {Database}  from './shared/utils/database';
import foodRoutes from './interfaces/routes/FoodRoutes';
import authRoutes from './interfaces/routes/AuthRoutes';
import syncRoutes from './interfaces/routes/SyncRoutes';

dotenv.config();

const app : express.Application = express();
const db = Database.getInstance();

db.connectToDatabase();


app.use(express.json());
app.use('/api', foodRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/sync', syncRoutes);

app.get('/', (req, res) => {
  res.send('Food Delivery API');
});

export default app;