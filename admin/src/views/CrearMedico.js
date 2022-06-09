import {useState,useEffect,useRef} from "react"
import { crearMedico } from "../services/MedicoServices"
import { getEspecialidades } from "../services/EspecialidadServices"
import {useNavigate } from "react-router-dom"
import Swal from "sweetalert2"



export default function CrearMedico() {

    // const
    const navigate = useNavigate()
    const [inputs,setInputs] = useState({
        med_nom:"",
        med_ape:"",
        med_dir:"",
        med_tel:"",
        med_edad: "",
        med_dni: "",
        med_email:"",
        especialidadId:1
    })

    // const [especialidades,setEspecialidades] = useState([])

 const manejarInput = (e)=>{
     setInputs({
         ...inputs,
         [e.target.name]:e.target.value
     })
 }

 const manejarSubmit = async (e)=>{
     e.preventDefault();
     try {
         await crearMedico(inputs)
         Swal.fire({
            icon:"success",
            title:"Medico Creado"
            
        })
        navigate("/medico")
     } catch (error) {
         return error
     }
 }

 const existeErrorEnLosInputs =()=>{
    if(inputs.med_nom.trim()=== "" || inputs.med_ape.trim()===""||inputs.med_dir.trim()===""||inputs.med_email.trim()===""){
    // si alguno de los inputs quitandole los espacios no tiene nada de texto, retornare true 
        return true
    }
    return false
}
  return (
    <div>
        <h1 className="my-4 sec-color">Crear Médico</h1>
        <form onSubmit={(e)=>{manejarSubmit(e)}}>
            <div className="mb-3">
                <label className="form-label color-main family-bitter">Nombre: </label>
                <input type="text" placeholder="Ingresa el nombre del Medico" name ="med_nom" 
                className="form-control" value={inputs.med_nom}
                onChange={(e)=>{manejarInput(e)}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="" className="form-label color-main family-bitter">Apellidos</label>
                <input type="text" className="form-control" placeholder="Ingresa los apellidos" value={inputs.med_ape} name="med_ape" 
                onChange={(e)=>{manejarInput(e)}} />
                </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label color-main family-bitter">Dirección</label>
                <input type="text" className="form-control" placeholder="Direccion del Medico" value={inputs.med_dir} name="med_dir" 
                onChange={(e)=>{manejarInput(e)}} />
                </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label color-main family-bitter">Telefono</label>
                <input type="number" className="form-control" placeholder="Telefono del Medico" value={+inputs.med_tel} name="med_tel" 
                onChange={(e)=>{manejarInput(e)}} />
                </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label color-main family-bitter">Edad</label>
                <input type="number" className="form-control" placeholder="Ingresa la edad" value={+inputs.med_edad} name="med_edad" 
                onChange={(e)=>{manejarInput(e)}} />
                </div>
                <div className="mb-3">
                <label htmlFor="" className="form-label color-main family-bitter">DNI</label>
                <input type="number" className="form-control" placeholder="DNI" value={+inputs.med_dni} name="med_dni" 
                onChange={(e)=>{manejarInput(e)}} />
                </div>
                <div className="mb-3">
                <label htmlFor="" className="form-label color-main family-bitter">email</label>
                <input type="email" className="form-control" placeholder="Email" value={inputs.med_email} name="med_email" 
                onChange={(e)=>{manejarInput(e)}} />
                </div>

                <button className=" btn buton-send" type="submit"  disabled={existeErrorEnLosInputs()}>Guardar</button>
        </form>
    </div>
  )
}
