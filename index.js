import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// import bodyParser from 'body-parser';
// import axios from 'axios';


import userRoute from './routes/UserRoutes.js';
import propertyRoutes from './routes/PropertyRoutes.js';
import authRoutes from './routes/Auth.js';
import purchaseRoutes from './routes/purchaseRoutes.js';



import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();


app.use(cors({
  origin: ['http://localhost:3000', "https://zali0.github.io"],
  credentials: true               
}));
app.use(cookieParser());
app.use(express.json());
dotenv.config();


const PORT = process.env.PORT || 7000;
const DB_URI = process.env.ATLAS_URI;



app.use('/api', userRoute); // Use the user routes
app.use('/api', propertyRoutes); // Use the property routes
app.use('/api', authRoutes); // Use the authentication routes

app.use("/api", purchaseRoutes); // Use the purchase routes



// Connecting to MongoDB

mongoose.connect(DB_URI)
.then(() => {console.log('Connected to MongoDB');})
.catch(err => console.error('MongoDB connection error:', err));



import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Serve frontend build
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});



// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




