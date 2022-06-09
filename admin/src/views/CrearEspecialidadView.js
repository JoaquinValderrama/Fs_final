import {useState} from "react"
import { crearEspecialidad } from "../services/EspecialidadServices"
import Swal from "sweetalert2"
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom"

export default function CrearEspecialidadView() {

    const[input,setInput] = useState({
        esp_nom:"",
        esp_des:""
    })

    const navigate = useNavigate()

    const manejarInput = (e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    const manejarSubmit = async(e)=>{
        e.preventDefault();
        try {
            await crearEspecialidad(input)
            Swal.fire({
                icon:"success",
                title:"Especialidad Creada"
            })
            navigate("/especialidad")
            
        } catch (error) {
            
        }
    }

    const existeErrorEnLosInputs =()=>{
        if(input.esp_nom.trim()=== "" || input.esp_des.trim()===""){
        // si alguno de los inputs quitandole los espacios no tiene nada de texto, retornare true 
            return true
        }
        return false
    }

  return (
    <div>
    <Link className="btn mt-4 p-0" to={`/especialidad`}><i className=" i-edit fa-solid fa-circle-arrow-left fa-2x"></i> </Link>
    <h1 className="my-4 sec-color">Crear Especialidad</h1>
    <form onSubmit={(e)=>{manejarSubmit(e)}}>
        <div className="mb-3">
            <label className="form-label color-main family-bitter">Nombre Especialidad: </label>
            <input type="text" placeholder="Ingresa el nombre de la Especialidad" 
             name="esp_nom" className="form-control " value={input.esp_nom}
             onChange={(e)=>{manejarInput(e)}}/>
        </div>

        <div className="mb-3">
            <label htmlFor="" className="form-label color-main family-bitter">Descripción Especialidad: </label>
            <input type="text" placeholder="Ingresa la descripción de la Especialidad" 
             name="esp_des" className="form-control" value={input.esp_des}
             onChange={(e)=>{manejarInput(e)}}/>
        </div>

        <button className=" btn buton-send" type="submit"  disabled={existeErrorEnLosInputs()}>Guardar</button>
    </form>
</div>
  )
}

