import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import dotenv, { parse } from 'dotenv';
import connectDB from './lib/db.js';
import cookieParser from 'cookie-parser';
import { app, server, io } from './lib/socket.js';
import path from 'path';

dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}


server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`, process.env.CLIENT_URL);
  connectDB();
});