import {config} from './dbconfig.js';
import sql from 'mssql';

class GeriatricoServices{
    static getAll = async () =>{
        let returnEntity = null;
        console.log('Estoy en: GeriatricoServices.getAll()');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .query('SELECT * FROM MedicamentoATomar inner join Paciente on Paciente.Id= MedicamentoATomar.IdPaciente inner join Medicamentos on Medicamentos.Id=MedicamentoATomar.IdMedicamento');
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
                                    .query('SELECT * FROM MedicamentoATomar inner join Paciente on Paciente.Id= MedicamentoATomar.IdPaciente WHERE Paciente.Id = @pId ');
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
        }
    }
}

export default GeriatricoServices