import {config} from './dbconfig.js';
import sql from 'mssql';

class GeriatricoServices{
    static getAllMedicamentosATomar = async () =>{
        let returnEntity = null;
        console.log('Estoy en: GeriatricoServices.getAll()');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .query('Select M.IdMedicamento, M.NombreMedicamento,MedicamentoATomar.TomoMedicacion from Medicamentos M inner join MedicamentoATomar MT on MT.IdMedicamento=M.IdMedicamento');
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
        }
    }
    static getMedicamentoATomarById = async (Id) =>{
        let returnEntity = null;
        console.log('Estoy en: GeriatricoServices.GetById(Id)',Id);
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input("pId", sql.Int, Id)
                                    .query(' Select M.IdMedicamento, M.NombreMedicamento,MT.TomoMedicacion, MT.FechaHora from Medicamentos M inner join MedicamentoATomar MT on MT.IdMedicamento=M.IdMedicamento inner join Paciente P on P.IdPaciente=MT.IdPaciente where P.IdPaciente=@pId');
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
        }
    }
    static getHistoriaClinica = async (Id) =>{
        let returnEntity = null;
        console.log('Estoy en: GeriatricoServices.GetHC(Id)',Id);
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input("pId", sql.Int, Id)
                                    .query('Select H.* from HistoriaClinica H inner join Paciente P on H.IdPaciente = P.IdPaciente where H.IdPaciente=@pId');
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
        }
    }

    static getAll = async () =>{
        let returnEntity = null;
        console.log('Estoy en: GeriatricoServices.getAll()');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input("pId", sql.Int, Id)
                                    .query('Select M.*, MT.*, P.*, HC.* from Medicamentos M inner join MedicamentoATomar MT on MT.IdMedicamento=M.IdMedicamento, inner join Paciente P on P.IdPaciente = MT.IdPaciente, inner join HistoriaClinica HC on HC.IdPaciente = P.IdPaciente where P.Id=@pId');
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
        }
    }
    static getInforme = async (Id) =>{
        let returnEntity = null;
        console.log('Estoy en: GeriatricoServices.GetInforme(Id)',Id);
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input("pId", sql.Int, Id)
                                    .query('Select Top 1 I.* from Informe I inner join Paciente P on I.IdPaciente = P.IdPaciente where I.IdPaciente=@pId order by I.FechaHoy Desc');
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
        }
    }
    static getKinesiologia = async (Id) =>{
        let returnEntity = null;
        console.log('Estoy en: GeriatricoServices.GetKinesiologia(Id)',Id);
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input("pId", sql.Int, Id)
                                    .query('Select Top 1 K.* from Kinesiologia K inner join Paciente P on K.IdPaciente = P.IdPaciente where K.IdPaciente=@pId order by K.FechaHoy Desc');
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
        }
    }
    static getFechasRelevantes = async () =>{
        let returnEntity = null;
        console.log('Estoy en: GeriatricoServices.getFechasRelevantes()');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .query('Select * from FechasRelevantes order by Fecha Desc');
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
        }
    }

    static getVisitas = async () =>{
        let returnEntity = null;
        console.log('Estoy en: GeriatricoServices.getVisitas()');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .query('SELECT * FROM Visitas V INNER JOIN Paciente P on V.IdPaciente = P.IdPaciente');
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
        }
    }
    static getFechas = async () =>{
        let returnEntity = null;
        console.log('Estoy en: GeriatricoServices.getFechasRelevantes()');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .query('Select HoraDeLlegada,Fecha from Visitas where Ocupado=1');
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
        }
    }
    static nuevaVisita = async (Nombre, Fecha, HoraDeLlegada, Ocupado, IdPaciente) => {
        try {
            let pool = await sql.connect(config);
    
            const [hora, minuto, segundo] = HoraDeLlegada.split(':');
            const formattedHoraDeLlegada = new Date(0, 0, 0, hora, minuto, segundo);
    
            const isOcupado = Ocupado === "1";
    
            let result = await pool.request()
                .input("pNombre", sql.VarChar, Nombre)
                .input("Fecha", sql.Date, Fecha)
                .input("pHoraDeLlegada", sql.Time, formattedHoraDeLlegada)
                .input("pOcupado", sql.Bit, isOcupado) 
                .input("pIdPaciente", sql.Int, IdPaciente)
                .query('Insert into Visitas (Nombre,Fecha,HoraDeLlegada,Ocupado,IdPaciente) values (@pNombre,@Fecha,@pHoraDeLlegada,@pOcupado,@pIdPaciente)');            
            return result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
    }
    static deleteVisita = async (idVisita) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input("pIdVisita", sql.Int, idVisita)
                .query('DELETE FROM Visitas WHERE Id = @pIdVisita');
            return result.rowsAffected[0];
        } catch (error) {
            console.log(error);
        }
    }
    
}

export default GeriatricoServices