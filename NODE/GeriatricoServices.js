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
    static insertMedicamentos = async (NombreMedicamento) => {
        try {
            let pool = await sql.connect(config);
    
            let result = await pool.request()
                .input("pNombreMedicamento", sql.VarChar, NombreMedicamento)
                .query('Insert into Medicamentos (NombreMedicamento) values (@pNombreMedicamento)');            
            return result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
    }
    
    static deleteMedicamentos = async (IdMedicamento) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input("pIdMedicamento", sql.Int, IdMedicamento)
                .query('DELETE FROM Medicamentos WHERE IdMedicamento = @pIdMedicamento');
            return result.rowsAffected[0];
        } catch (error) {
            console.log(error);
        }
    }
    static updateMedicamentos = async (Medicamentos) => {
        let rowsAffected = 0;
        const { IdMedicamento, NombreMedicamento } = Medicamentos;
        try {
            const pool = await sql.connect(config);
            const result = await pool.request()
                .input('pIdMedicamento', sql.Int, IdMedicamento)
                .input('pNombreMedicamento', sql.NVarChar, NombreMedicamento)
                .query('UPDATE Medicamentos SET NombreMedicamento = @pNombreMedicamento WHERE IdMedicamento = @pIdMedicamento');
            rowsAffected = result.rowsAffected[0];
        } catch (error) {
            console.error(error);
        }
        return rowsAffected;
    }
    
    static insertMedicamentoXPaciente = async (TomoMedicacion,IdMedicamento,IdPaciente,FechaHora) => {
        try {
            let pool = await sql.connect(config);

            let result = await pool.request()
                .input("pFechaHora", sql.DateTime, FechaHora)
                .input("pTomoMedicacion", sql.Bit, TomoMedicacion) 
                .input("pIdMedicamento", sql.Int, IdMedicamento)
                .input("pIdPaciente", sql.Int, IdPaciente)
                .query('Insert into MedicamentosATomar (TomoMedicacion,IdMedicamento,IdPaciente,FechaHora) values (@pTomoMedicacion,@pIdMedicamento,@pIdPaciente,@pFechaHora)');            
            return result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
    }
    static deleteMedicamentoXPaciente = async (Id) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input("pId", sql.Int, Id)
                .query('DELETE FROM MedicamentosATomar WHERE Id = @pId');
            return result.rowsAffected[0];
        } catch (error) {
            console.log(error);
        }
    }
    static updateMedicamentosXPaciente = async (MedicamentosATomar) =>{
        let rowsAffected = 0;
        const{Id,TomoMedicacion,IdMedicamento, IdPaciente,FechaHora} = MedicamentosATomar;
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId',Id)
                                    .input('pTomoMedicacion',TomoMedicacion)
                                    .input('pIdMedicamento',IdMedicamento)
                                    .input('pIdPaciente',IdPaciente)
                                    .input('pFechaHora',FechaHora)
                                    .query('UPDATE MedicamentoATomar set TomoMedicacion = @pTomoMedicacion, IdMedicamento = @pIdMedicamento, IdPaciente = @pIdPaciente, FechaHora = @pFechaHora  WHERE Id = @pId');
            rowsAffected = result.rowsAffected;
        }
        catch(error){
            console.log(error);
        }
        return rowsAffected;
    }
    static insertFechasRelevantes = async (Fecha,Texto,Hora,Imagen,Info) => {
        try {
            let pool = await sql.connect(config);
            
            let result = await pool.request()
                .input("pFecha", sql.Date, Fecha)
                .input("pTexto", sql.VarChar, Texto) 
                .input("pHora", sql.Time, Hora)
                .input("pImagen", sql.VarChar, Imagen)
                .input("pInfo", sql.VarChar, Info)
                .query('Insert into FechasRelevantes (Fecha,Texto,Hora,Imagen,Info) values (@pFecha,@pTexto,@pHora,@pImagen,@pInfo)');            
            return result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
    }
    static deleteFechasRelevantes = async (Id) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input("pId", sql.Int, Id)
                .query('DELETE FROM FechasRelevantes WHERE Id = @pId');
            return result.rowsAffected[0];
        } catch (error) {
            console.log(error);
        }
    }
    static updateFechasRelevantes = async (id, fechasRelevantes) => {
        let rowsAffected = 0;
        const { Fecha, Texto, Hora, Imagen, Info } = fechasRelevantes;
        try {
          let pool = await sql.connect(config);
          let result = await pool.request()
            .input('pId', id)
            .input('pFecha', Fecha)
            .input('pTexto', Texto)
            .input('pHora', Hora)
            .input('pImagen', Imagen)
            .input('pInfo', Info)
            .query('UPDATE FechasRelevantes SET Fecha = @pFecha, Texto = @pTexto, Hora = @pHora, Imagen = @pImagen, Info = @pInfo WHERE Id = @pId');
          rowsAffected = result.rowsAffected[0];
        } catch (error) {
          console.log(error);
        }
        return rowsAffected;
      };
    static insertActividades = async (Nombre) => {
        try {
            let pool = await sql.connect(config);
            
            let result = await pool.request()
                .input("pNombre", sql.VarChar, Nombre) 
                .query('Insert into Actividades (Nombre) values (@pNombre)');            
            return result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
    }
    static deleteActividades = async (Id) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input("pId", sql.Int, Id)
                .query('DELETE FROM Actividades WHERE Id = @pId');
            return result.rowsAffected[0];
        } catch (error) {
            console.log(error);
        }
    }
    static updateActividades = async (Actividades) =>{
        let rowsAffected = 0;
        const{Id,Nombre} = Actividades;
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId',Id)
                                    .input('pNombre',Nombre)
                                    .query('UPDATE Actividades set Nombre = @pNombre WHERE Id = @pId');
            rowsAffected = result.rowsAffected;
        }
        catch(error){
            console.log(error);
        }
        return rowsAffected;
    }
    static insertActividadXPaciente = async (IdActividad,IdPaciente) => {
        try {
            let pool = await sql.connect(config);
            
            let result = await pool.request()
                .input("pIdActividad", sql.Int, IdActividad)
                .input("pIdPaciente", sql.Int, IdPaciente)
                .query('Insert into ActividadXPaciente (IdActividad,IdPaciente) values (@pIdActividad,@pIdPaciente)');            
            return result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
    }
    static deleteActividadXPaciente = async (IdActividad,IdPaciente) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input("pIdActividad", sql.Int, IdActividad)
                .input("pIdPaciente", sql.Int, IdPaciente)
                .query('DELETE FROM ActividadXPaciente WHERE IdActividad = @pIdActividad and IdPaciente = @pIdPaciente');
            return result.rowsAffected[0];
        } catch (error) {
            console.log(error);
        }
    }
    
    static insertFotos = async (IdAct,Url) => {
        try {
            let pool = await sql.connect(config);
            
            let result = await pool.request()
                .input("pIdAct", sql.Int, IdAct)
                .input("pUrl", sql.VarChar, Url)
                .query('Insert into Fotos (IdAct,Url) values (@pIdAct,@pUrl)');  
            return result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
    }
    static deleteFotos = async (Id) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input("pId", sql.Int, Id)
                .query('DELETE FROM Fotos WHERE Id = @pId');
            return result.rowsAffected[0];
        } catch (error) {
            console.log(error);
        }
    }
    static getAllMedicamentos = async () =>{
        let returnEntity = null;
        console.log('Estoy en: GeriatricoServices.getAll()');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .query('Select * from Medicamentos');
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
        }
    }
    static getAllActividades = async () =>{
        let returnEntity = null;
        console.log('Estoy en: GeriatricoServices.getAll()');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .query('Select * from Actividades');
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
        }
    }

    
}

export default GeriatricoServices