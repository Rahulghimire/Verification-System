import express, { Express } from "express";
import cors from "cors";
import { PORT } from "../config";
import verifyRoutes from "../routes/verify";
import { errorHandler } from "../middlewares/errorHandler";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use("/verify", verifyRoutes);
app.use(errorHandler);

app.listen(PORT);
