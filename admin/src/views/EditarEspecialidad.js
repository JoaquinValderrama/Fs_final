import {useState,useEffect,useRef} from "react"
import { getEspecialidades } from "../services/EspecialidadServices"
import { editarEspecialidad,getEspecialidadesPorId } from "../services/EspecialidadServices"
import Swal from "sweetalert2"
import {useNavigate } from "react-router-dom"
import {Link} from "react-router-dom"
import { useParams } from "react-router-dom"

export default function EditarEspecialidad() {


    const [inputs,setInputs] = useState({
        esp_nom:"",
        esp_des:""
    })
    const {idEsp} = useParams()
    const [especialidad,setEspecialidad] = useState([])
    const navigate = useNavigate()

    const manejarInputs =(e)=>{
        setInputs({
            ...inputs,

            [e.target.name]:e.target.value
        })
    }
    const manejoSubmit = async(e)=>{
        e.preventDefault()
        try {
            await editarEspecialidad(idEsp,inputs)
            Swal.fire({
                icon:"success",
                title:"Especialidad Editada"
            })
            navigate("/especialidad")
        } catch (error) {
            console.log(error)
        }
    }


    const existeErrorEnLosInputs =()=>{
        if(inputs.esp_nom.trim()=== "" || inputs.esp_des.trim()===""){
        // si alguno de los inputs quitandole los espacios no tiene nada de texto, retornare true 
            return true
        }
        return false
    }

    useEffect(()=>{
        const mostrarEspecialidad = async () =>{
            try{
                const especialidadObtenida =await getEspecialidades()

                const infoEspecialidad = especialidadObtenida.map(({esp_nom, esp_des})=>{
                    return {esp_nom:esp_nom,esp_des:esp_des}
                })
                setEspecialidad(infoEspecialidad)
                
                const especialidadEditar = await getEspecialidadesPorId(idEsp)

                setInputs(especialidadEditar)

            }catch(error){
                console.log(error)
            }
        }
        mostrarEspecialidad()
    },[])

  return (
    <div>
        <Link className="btn mt-4 p-0" to={`/especialidad`}><i class=" i-edit fa-solid fa-circle-arrow-left fa-2x"></i> </Link>
        <h1 className="my-4 sec-color">Editar Especialidad</h1>
        <form onSubmit={(e)=>{manejoSubmit(e)}}>
            <div className="mb-3">
                <label className="form-label color-main family-bitter">Nombre Especialidad: </label>
                <input type="text" placeholder="Ingresa el nombre de la Especialidad" 
                 name="esp_nom" className="form-control " value={inputs.esp_nom}
                 onChange={(e)=>{manejarInputs(e)}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="" className="form-label color-main family-bitter">Descripción Especialidad: </label>
                <input type="text" placeholder="Ingresa la descripción de la Especialidad" 
                 name="esp_des" className="form-control" value={inputs.esp_des}
                 onChange={(e)=>{manejarInputs(e)}}/>
            </div>

            <button className=" btn buton-send" type="submit"  disabled={existeErrorEnLosInputs()}>Guardar</button>
        </form>
    </div>
  )
}



