import {useState,useEffect} from "react"
import {Link} from "react-router-dom"
import { getEspecialidades,eliminarEspecialidad } from "../services/EspecialidadServices"
import Swal from "sweetalert2"
import { useParams } from "react-router-dom"

export default function EspecialidadView() {

    const[especialidad,setEspecialidad] = useState([])

    // const {idEsp} = useParams()

    const deletEspecialidad =async(idEsp)=>{
        try {
            const resultado = await Swal.fire({
                title: 'Desea eliminar esta Especialidad',
                showCancelButton: true,
                confirmButton:'Si, eliminar',
                cancelButtonText: 'No, cancelar',
            })
            if(resultado.isConfirmed){
                await eliminarEspecialidad(idEsp)
                Swal.fire({
                    title:"Especialidad eliminada",
                    icon: "success"
                })
                const mostrarEspecialidad = async () =>{
                    try{
                        const especialidadObtenida =await getEspecialidades()
                        setEspecialidad(especialidadObtenida)
                    }catch(error){
                        console.log(error)
                    }
                }
                mostrarEspecialidad();
            }
        } catch (error) {
            console.log(error)
        }
    }

    
    useEffect(()=>{
        const mostrarEspecialidad = async () =>{
            try{
                const especialidadObtenida =await getEspecialidades()
                setEspecialidad(especialidadObtenida)
            }catch(error){
                console.log(error)
            }
        }
        mostrarEspecialidad();
    },[])


  return (
    <div>
        <div className="card mt-5">
            <div className="card-body table-responsive">
                <h2 className="card-title sec-color">Especialidades</h2>
                <Link className="btn buton-send mt-4" to="/crearespecialidad">Nueva Especialidad</Link>
                <table className="table mt-4">
                    <thead className="table-purple family-bitter color-main">
                        <tr>
                            <th className="text-center">Nombre</th>
                            <th className="text-center">Descripcion</th>
                            <th className="text-center">Estado</th>
                        </tr>
                    </thead>
                <tbody>
                    {especialidad.map((item,indice)=>(
                        <tr key={indice}>
                            <td className="family-bitter third-color col-sm-12 col-md-2 fw-bold">{item.esp_nom}</td>
                            <td className="sec-color col-md-6">{item.esp_des}</td>
                            <td className="col-sm-1 text-center align-middle">
                            <Link className="btn"  to={`/editarEspecialidad/especialidad/${item.esp_id}`}>
                            <i className="fa-solid fa-pencil i-edit"></i></Link>
                            <button className="btn ms-2" onClick={()=>{deletEspecialidad(item.esp_id)}}>
                            
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

