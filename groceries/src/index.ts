import express from 'express';
import bodyParser from 'body-parser';
import { userRoutes } from './routes/userRoutes';
import { InventoryRoutes } from './routes/inventoryRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user', userRoutes);
app.use('/inventory', InventoryRoutes);

export { app }