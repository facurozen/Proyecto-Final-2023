import {config} from './dbconfig.js';
import sql from 'mssql';
import GeriatricoServices from './GeriatricoServices.js';
import express from "express";
import cors from "cors";

const app = express();
const port = 5000; 

app.use(cors());
app.use(express.json());


app.get('/MedicamentoATomar',async(req,res)=>{
    const datos = await GeriatricoServices.getAll()
    res.status(200).send(datos)
})

app.get('/MedicamentoATomar/:Id',async(req,res)=>{
    const MedicamentoATomar = await GeriatricoServices.getMedicamentoATomarById(req.params.Id)
    res.status(200).send(MedicamentoATomar)
})

app.get('/HistoriaClinica/:Id',async(req,res)=>{
    const HistoriaClinica = await GeriatricoServices.getHistoriaClinica(req.params.Id)
    res.status(200).send(HistoriaClinica)
})


app.listen(port, () =>
{
    console.log("escucho");
}
)