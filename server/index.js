import "dotenv/config";
import express from 'express';
import connectDB from './config/db.js';
import cors from "cors";
import morgan from "morgan";
import { accessLogStream } from "./utilities/utils.js";
import urlRoutes from "./routers/urlRoutes.js";
import userRoutes from "./routers/userRoutes.js";
import { redirect } from "./controllers/urlController.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
const port = process.env.PORT || 5000;

// connect to DB
connectDB().catch(err => {
  console.error('Continuing without DB due to connection error.');
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve React static files
app.use(express.static(path.join(__dirname, "..", 'client/dist')));

app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream: accessLogStream })); // detailed logs for production

app.use("/api/v1/urls", urlRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/:shortCode", redirect);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "..", 'client/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app hosted on http://localhost:${port}`);
})
