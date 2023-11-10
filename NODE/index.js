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

app.get("/Medicamentos", async (req, res) => {
  const datos = await GeriatricoServices.getAllMedicamentos();
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
  const FechasRelevantes = await GeriatricoServices.getFechasRelevantes(req.params.Id);
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

app.post('/NuevoMedicamento', async (req, res) => {
  try {
    const medicamentos = await GeriatricoServices.insertMedicamentos(
      req.body.NombreMedicamento
    );
    res.status(200).send(medicamentos);
  } catch (error) {
    res.status(500).send("Error al agregar la visita.");
  }
});
app.delete('/EliminarMedicamento/:IdMedicamento', async (req, res) => {
  const IdMedicamento = req.params.IdMedicamento;
  const rowsAffected = await GeriatricoServices.deleteMedicamentos(IdMedicamento);
  if (rowsAffected > 0) {
      res.status(200).send(`Medicamento con ID ${IdMedicamento} eliminado correctamente.`);
  } else {
      res.status(404).send(`No se encontró un medicamento con ID ${IdMedicamento}.`);
  }
});
app.put('/EditarMedicamento/:IdMedicamento', async (req, res) => {
  try {
    const { IdMedicamento } = req.params; 
    const { NombreMedicamento } = req.body; 
    
    const rowsAffected = await GeriatricoServices.updateMedicamentos({
      IdMedicamento: IdMedicamento,
      NombreMedicamento: NombreMedicamento,
    });

    if (rowsAffected > 0) {
      res.status(200).json({ message: 'Medicamento actualizado' });
    } else {
      res.status(404).json({ error: 'No se encontró el medicamento o no se realizaron cambios' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fallo el update' });
  }
});


app.post('/NuevoMedicamentoXPaciente', async (req, res) => {
  try {
    const medicamentos = await GeriatricoServices.insertMedicamentoXPaciente(
      req.body.TomoMedicacion,
      req.body.IdMedicamento,
      req.body.IdPaciente,
      req.body.FechaHora
    );
    res.status(200).send(medicamentos);
  } catch (error) {
    res.status(500).send("Error ");
  }
});
app.delete('/EliminarMedicamentoXPaciente/:Id', async (req, res) => {
  const Id = req.params.Id;
  const rowsAffected = await GeriatricoServices.deleteMedicamentoXPaciente(Id);
  if (rowsAffected > 0) {
      res.status(200).send(`Medicamento con ID ${Id} eliminado correctamente.`);
  } else {
      res.status(404).send(`No se encontró un medicamento con ID ${Id}.`);
  }
});
app.put('/editarMedicamentoXPaciente',async(req,res)=>{
  try{
      await GeriatricoServices.updateMedicamentosXPaciente(req.body)
      res.status(200).json({message:'Medicamento actualizado'});
  }   catch (error){
      console.error(error);
      res.status(500).json({error:'Fallo el update'});
  }
})

app.post('/NuevoFechasRelevantes', async (req, res) => {
  try {
    const fechasRelevantes = await GeriatricoServices.insertFechasRelevantes(
      req.body.Fecha,
      req.body.Texto,
      req.body.Hora,
      req.body.Imagen,
      req.body.Info
    );
    res.status(200).send(fechasRelevantes);
  } catch (error) {
    res.status(500).send("Error ");
  }
});
app.delete('/EliminarFechasRelevantes/:Id', async (req, res) => {
  const Id = req.params.Id;
  const rowsAffected = await GeriatricoServices.deleteFechasRelevantes(Id);
  if (rowsAffected > 0) {
      res.status(200).send(`Fechas con ID ${Id} eliminado correctamente.`);
  } else {
      res.status(404).send(`No se encontró una fecha con ID ${Id}.`);
  }
});
app.put('/EditarFechasRelevantes/:Id', async (req, res) => {
  try {
    const rowsAffected = await GeriatricoServices.updateFechasRelevantes(req.params.Id, req.body);
    if (rowsAffected > 0) {
      res.status(200).json({ message: 'Fecha actualizada' });
    } else {
      res.status(404).json({ error: 'Fecha no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fallo el update' });
  }
});

app.post('/insertActividades', async (req, res) => {
  try {
    const Actividades = await GeriatricoServices.insertActividades(
      req.body.Nombre
    );
    res.status(200).send(Actividades);
  } catch (error) {
    res.status(500).send("Error ");
  }
});
app.delete('/deleteActividades/:Id', async (req, res) => {
  const Id = req.params.Id;
  const rowsAffected = await GeriatricoServices.deleteActividades(Id);
  if (rowsAffected > 0) {
      res.status(200).send(`Actividades con ID ${Id} eliminado correctamente.`);
  } else {
      res.status(404).send(`No se encontró una Act con ID ${Id}.`);
  }
});
app.put('/editarActividades',async(req,res)=>{
  try{
      await GeriatricoServices.updateActividades(req.body)
      res.status(200).json({message:'Act actualizado'});
  }   catch (error){
      console.error(error);
      res.status(500).json({error:'Fallo el update'});
  }
})

app.post('/insertActividadXPaciente', async (req, res) => {
  try {
    const Actividades = await GeriatricoServices.insertActividadXPaciente(
      req.body.IdActividad,
      req.body.IdPaciente
    );
    res.status(200).send(Actividades);
  } catch (error) {
    res.status(500).send("Error ");
  }
});
app.delete('/deleteActividadXPaciente/:IdAct', async (req, res) => {
  const IdAct = req.params.IdActividad;
  const rowsAffected = await GeriatricoServices.deleteActividadXPaciente(IdAct,IdPac);
  if (rowsAffected > 0) {
      res.status(200).send(`Eliminado correctamente.`);
  } else {
      res.status(404).send(`No se encontró.`);
  }
});

app.post('/insertFotos', async (req, res) => {
  try {
    const Fotos = await GeriatricoServices.insertFotos(
      req.body.IdAct,
      req.body.Url
    );
    res.status(200).send(Fotos);
  } catch (error) {
    res.status(500).send("Error");
  }
});
app.delete('/deleteFotos/:Id', async (req, res) => {
  const Id = req.params.Id;
  const rowsAffected = await GeriatricoServices.deleteFotos(Id);
  if (rowsAffected > 0) {
      res.status(200).send(`Eliminado correctamente.`);
  } else {
      res.status(404).send(`No se encontró.`);
  }
});

app.post('/NuevoMenu', async (req, res) => {
  try {
    const menu = await GeriatricoServices.insertMenu(
      req.body.Fecha,
      req.body.Plato
    );
    res.status(200).send(menu);
  } catch (error) {
    res.status(500).send("Error.");
  }
});

app.delete('/EliminarMenu/:Id', async (req, res) => {
  const Id = req.params.Id;
  const rowsAffected = await GeriatricoServices.deleteMenu(Id);
  if (rowsAffected > 0) {
      res.status(200).send(` eliminado correctamente.`);
  } else {
      res.status(404).send(`No se encontró.`);
  }
});

app.put('/EditarMenu/:Id', async (req, res) => {
  try {
    const { Id } = req.params; 
    const { Fecha } = req.body; 
    const { Plato } = req.body; 
    
    const rowsAffected = await GeriatricoServices.updateMenu({
      Id: Id,
      Fecha: Fecha,
      Plato: Plato,
    });

    if (rowsAffected > 0) {
      res.status(200).json({ message: ' actualizado' });
    } else {
      res.status(404).json({ error: 'no se realizaron cambios' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fallo el update' });
  }
});
app.get("/Menu", async (req, res) => {
  const datos = await GeriatricoServices.getAllMenu();
  res.status(200).send(datos);
});
app.get("/Actividades", async (req, res) => {
  const datos = await GeriatricoServices.getAllActividades();
  res.status(200).send(datos);
});
app.get("/ActividadXPaciente", async (req, res) => {
  const datos = await GeriatricoServices.getAllActXPac();
  res.status(200).send(datos);
});

app.listen(port, () => {
  console.log("escucho");
});
