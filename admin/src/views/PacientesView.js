import {useState, useEffect} from "react"
import { getPaciente,eliminarPaciente } from "../services/PacientesServices"
import {Link} from "react-router-dom"
import Swal from "sweetalert2"


export default function PacientesView() {

    const [pacientes,setPacientes] = useState([])

    const deletePaciente = async(idPac)=>{
        try {
            const resultado = await Swal.fire({
                title: 'Desea eliminar esta Especialidad',
                showCancelButton: true,
                confirmButton:'Si, eliminar',
                cancelButtonText: 'No, cancelar',
            })
            if(resultado.isConfirmed){
                await eliminarPaciente(idPac)
                Swal.fire({
                    title:"Especialidad eliminada",
                    icon: "success"
            })
            const obtenerPaciente =async() =>{

                try {
                        const pacienteObtenido = await getPaciente()
                        setPacientes(pacienteObtenido)
                } catch (error) {
                    return error
                }
            }
            obtenerPaciente();
            }
        } catch (error) {
            return error
        }
    }

    useEffect(()=>{
        const obtenerPaciente =async() =>{

            try {
                    const pacienteObtenido = await getPaciente()
                    setPacientes(pacienteObtenido)
            } catch (error) {
                return error
            }
        }
        obtenerPaciente();
    },[])

  return (
    <div>
        <div className="card mt-5">
            <div className="card-body table-responsive">
                <h2 className="card-title sec-color">Pacientes Registrados</h2>
                <table className="table mt-4">
                    <thead className="table-purple family-bitter color-main">
                        <tr>
                            <th className="text-center">Dni</th>
                            <th className="text-center">Nombres</th>
                            <th className="text-center">Apellidos</th>
                            <th className="text-center">Correo</th>
                            <th className="text-center">F. Nac</th>
                            <th className="text-center">Dirección</th>
                            <th className="text-center">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes.map((item,indice)=>(
                            <tr key={indice}>
                                <td className="text-center  col-sm-12-col-md-4">{item.paci_DocNro}</td>
                                <td className="text-center  col-sm-12-col-md-4">{item.paci_Nombres}</td>
                                <td className="text-center  col-sm-12-col-md-4">{item.paci_ApPaterno} {item.paci_ApMaterno}</td>
                                <td className="text-center  col-sm-12-col-md-4">{item.paci_Email}</td>
                                <td className="text-center  col-sm-12-col-md-4">{item.paci_FecNaci}</td>
                                <td className="text-center  col-sm-12-col-md-4">{item.paci_dir}</td>
                                <td className="text-center  col-sm-12-col-md-4">
                                    <Link className="btn" to={`/editarPaciente/paciente/${item.paci_id}`}>
                                        <i className="fa-solid fa-pencil i-edit"></i>
                                    </Link>
                                    <button className="btn ms-2" onClick={()=>{deletePaciente(item.paci_id)}}>
                                        <i className="fa-solid fa-trash i-trash"></i>
                                    </button>
                                </td>
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
