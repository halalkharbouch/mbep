import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from "cookie-parser";
import cors from 'cors';

//Routes
import partnerRouter from './routes/partner.routes.js';
import projectRouter from './routes/projects.routes.js';


dotenv.config();

mongoose
  .connect(process.env.MONGO_ATLAS)
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err));

const __dirname = path.resolve();

const app = express();


app.use(cors()); // Enable all CORS requests    
app.use(express.json());
app.use(cookieParser());

app.use("/api/partners", partnerRouter);
app.use("/api/projects", projectRouter);

app.listen(3000, () => console.log("Server is running on port 3000"));
