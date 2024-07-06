import express from 'express';
import dotenv from 'dotenv';
import {Database}  from './shared/utils/database';
import foodRoutes from './interfaces/routes/FoodRoutes';
import authRoutes from './interfaces/routes/AuthRoutes';
import syncRoutes from './interfaces/routes/SyncRoutes';
import orderRoutes from './interfaces/routes/OrderRoutes';

dotenv.config();

const app : express.Application = express();
const db = Database.getInstance();

db.connectToDatabase();


app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', foodRoutes);
app.use('/api', orderRoutes);
app.use('/api', syncRoutes);

app.get('/', (req, res) => {
  res.send('Food Delivery API');
});

export default app;