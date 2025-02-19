import express from "express";
import dotenv from "dotenv";
import { authRoutes } from "./routes/index.js";
import { dbConnection } from "./database/config.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Conexión BD Mongo
dbConnection();

// Acceso a carpeta pública
app.use(express.static("public"));
// Lectura y parseo de JSON
app.use(express.json());
app.use(cookieParser());

// 

app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
});