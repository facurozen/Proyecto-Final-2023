import { config } from "./dbconfig.js";
import sql from "mssql";
import GeriatricoServices from "./GeriatricoServices.js";
import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/MedicamentoATomar", async (req, res) => {
  const datos = await GeriatricoServices.getAllMedicamentosATomar();
  res.status(200).send(datos);
});

app.get("/MedicamentoATomar/:Id", async (req, res) => {
  const MedicamentoATomar = await GeriatricoServices.getMedicamentoATomarById(
    req.params.Id
  );
  res.status(200).send(MedicamentoATomar);
});

app.get("/HistoriaClinica/:Id", async (req, res) => {
  const HistoriaClinica = await GeriatricoServices.getHistoriaClinica(
    req.params.Id
  );
  res.status(200).send(HistoriaClinica);
});

app.get("/GetAll/:Id", async (req, res) => {
  const datos = await GeriatricoServices.getAll(req.params.Id);
  res.status(200).send(datos);
});

app.get("/Informe/:Id", async (req, res) => {
  const Informe = await GeriatricoServices.getInforme(req.params.Id);
  res.status(200).send(Informe);
});
app.get("/Kinesiologia/:Id", async (req, res) => {
  const Kinesiologia = await GeriatricoServices.getKinesiologia(req.params.Id);
  res.status(200).send(Kinesiologia);
});
app.get("/FechasRelevantes", async (req, res) => {
  const FechasRelevantes = await GeriatricoServices.getFechasRelevantes();
  res.status(200).send(FechasRelevantes);
});

app.get("/Visitas", async (req, res) => {
  const visitas = await GeriatricoServices.getVisitas();
  res.status(200).send(visitas);
});
app.post('/NuevaVisita', async (req, res) => {
    try {
      const visitas = await GeriatricoServices.nuevaVisita(
        req.body.Nombre,
        req.body.Fecha,
        req.body.HoraDeLlegada,
        req.body.Ocupado,
        req.body.IdPaciente
      );
      res.status(200).send(visitas);
    } catch (error) {
      res.status(500).send("Error al agregar la visita.");
    }
  });
app.get("/FechasOcupadas", async (req, res) => {
  const visitas = await GeriatricoServices.getFechas();
  res.status(200).send(visitas);
});
app.delete('/EliminarVisita/:idVisita', async (req, res) => {
    const idVisita = req.params.idVisita;
    const rowsAffected = await GeriatricoServices.deleteVisita(idVisita);
    if (rowsAffected > 0) {
        res.status(200).send(`Visita con ID ${idVisita} eliminada correctamente.`);
    } else {
        res.status(404).send(`No se encontró una visita con ID ${idVisita}.`);
    }
});
app.listen(port, () => {
  console.log("escucho");
});
