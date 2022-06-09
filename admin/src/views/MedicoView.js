import {useState,useEffect} from "react"
import {Link} from "react-router-dom"
// import { getMedicos } from "../services/MedicoService"
import Swal from "sweetalert2"
// import {useParams} from "react-router-dom"
import { getEspecialidades } from "../services/EspecialidadServices"


export default function MedicoView() {

    const [medico,setMedico] = useState([])
    const [especialidad,setEspecialidad] = useState([])

    useEffect (()=>{
        const mostrarMedico = async()=>{
            try {
                const especialidades = await getEspecialidades()
                
                const espFiltradas = especialidades.filter((esp) => esp.medico.length> 0 )
                const arrMedico = espFiltradas.map((esp)=>esp.medico).flat()

                setEspecialidad(especialidades)
                setMedico(arrMedico)

                console.log(especialidades[1].medico[1].med_nom)
            } catch (error) {
                console.log(error)
            }
        }
        mostrarMedico();
    },[])


    // const relacionState (){

    //     if (especialidad.esp_id === medico.especialidadId )
    //         ,,,medico
    // }


  return (
    <div>
        <div className="card mt-5">
        <div className="card-body table-responsive">
                <h2 className="card-title sec-color">Medicos</h2>
                <Link className="btn buton-send mt-4" to="/crearMedico">Nuevo Médico</Link>
                <table className="table mt-4">
                    <thead className="table-purple family-bitter color-main">
                        <tr>
                            <th className="text-center">Nombre</th>
                            <th className="text-center">Apellido</th>
                            <th className="text-center">Correo</th>
                            {/* <th className="text-center">Especialidad</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    {medico.map((item,indice)=>(
                        <tr key={indice}>
                            <td className="sec-color col-sm-12-col-md-4">
                                {item.med_nom}
                            </td>
                            <td className="sec-color color-sm-12 col-md-4">
                                {item.med_ape}
                            </td>
                            <td className="sec-color color-sm-12 col-md-3">
                                 {item.med_email}
                            </td>
                            {/* <td className="sec-color color-sm-2 col-md-1">
                                {item.especialidadId}
                            </td> */}
                        </tr>
))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}


