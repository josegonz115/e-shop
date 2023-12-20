import path from 'path';
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser';
import connectDB from './config/db'
import { notFound, errorHandler } from './middleware/errorMiddleware'
import productRoutes from './routes/productRoutes'
import userRoutes from './routes/userRoutes'
import orderRoutes from './routes/orderRoutes'
import uploadRoutes from './routes/uploadRoutes';

const port = process.env.PORT || 5000;
connectDB() // Connect to MongoDB
const app: express.Application = express();

// Body parser middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// cookie parser middleware
app.use(cookieParser());




app.get('/', (_, res:express.Response)=>{
    res.send("API is running...")
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req,res)=>res.send({
    clientId:process.env.PAYPAL_CLIENT_ID
}));

__dirname = path.resolve(); 
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=> console.log(`Server is running on port ${port}`))