import {config} from './dbconfig.js';
import sql from 'mssql';

class GeriatricoServices{
    static getAll = async () =>{
        let returnEntity = null;
        console.log('Estoy en: GeriatricoServices.getAll()');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .query('SELECT * FROM MedicamentoATomar inner join Paciente on Paciente.IdPaciente= MedicamentoATomar.IdPaciente inner join Medicamentos on Medicamentos.IdMedicamentos=MedicamentoATomar.IdMedicamento');
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
                                    .query('SELECT MT.FechaHora, MT.TomoMedicacion, Medicamentos.NombreMedicamento FROM MedicamentoATomar MT inner join Paciente on Paciente.IdPaciente= MT.IdPaciente inner join Medicamentos Medicamentos.IdMedicamentos=MT.IdMedicamento WHERE Paciente.IdPaciente = @pId ');
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
        }
    }
}

export default GeriatricoServices