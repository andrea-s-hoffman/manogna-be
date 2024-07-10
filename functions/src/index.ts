import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import sherpaRouter from "./routes/sherpaRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", sherpaRouter);
export const api = functions.https.onRequest(app);
