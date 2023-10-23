import { config } from "./dbconfig.js";
import sql from "mssql";
import GeriatricoServices from "./GeriatricoServices.js";
import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());



app.listen(port, () => {
    console.log("escucho");
  });
  