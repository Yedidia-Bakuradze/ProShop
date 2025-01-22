import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

import { noFound, errorHandler } from './middleware/errorMiddleware.js';
const port = process.env.PORT || 5000; //port 3000 is used by the frontend
connectDB();
const app = express();

app.get('/', (req, res) => {
    res.send('API is running ...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(noFound);
app.use(errorHandler);

//Initalizing the server
app.listen(port, () => console.log(`Server is running on port: ${port}`));
