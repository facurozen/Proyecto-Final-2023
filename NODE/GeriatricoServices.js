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
                                    .query('Select H.* from HistoriaClinica H inner join Paciente P on H.IdPaciente = P.IdPaciente where H.IdPaciente=@pId ASC');
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
}

export default GeriatricoServices