import {useState,useEffect,useRef} from "react"
import { getPacientebyId,editarPaciente } from "../services/PacientesServices"
import Swal from "sweetalert2"
import {useNavigate } from "react-router-dom"
import {Link} from "react-router-dom"
import { useParams } from "react-router-dom"
import { subirArchivo } from "../config/fireStorage"
import Cargando from "../components/Cargando.js"

let miArchivo = null;
export default function EditarPaciente() {
    const [inputs,setInputs] = useState({
        paci_Celular:0,
        paci_Nombres:"",
        paci_ApPaterno:"",
        paci_ApMaterno:"",
        paci_FecNaci:0,
        paci_dir:"",
        paci_Email:""
    })

    const {idPac} = useParams()
    const [paciente,setPaciente] = useState([])
    const [loading,setLoading] =useState(false)
    const navigate = useNavigate()
    const inputFile =useRef()
    
    const manejarInputs = (e)=>{
        setInputs({
            ...inputs,

            [e.target.name]:e.target.value
        })
    }

    const manejarFile =(e)=>{
        miArchivo = e.target.files[0]
    }

    const manejoSubmit = async (e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            if(miArchivo===null){
                await editarPaciente(idPac,inputs)
            }else{
                const archivoSubido = await subirArchivo(miArchivo)
                await editarPaciente(idPac, {...inputs,paci_foto:archivoSubido})
            }
            setLoading(false)
            Swal.fire({
                icon:"success",
                title:"Especialidad Editada"
            })
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        const mostrarPacientes =async()=>{
            try {
                const pacienteEditar = await getPacientebyId(idPac)
                setInputs(pacienteEditar)
            } catch (error) {
                return error
            }
        }
        mostrarPacientes();
    },[])

    if(loading){
        // en caso el estado loading sea verdadero en vez de retornar mi componente con sus inputs, retorno el comoponente cargando
        return <Cargando/>
    }
  return (
    <div>
        <h1 className="my-4 sec-color">Editar Paciente</h1>
        <form className="row" onSubmit={(e)=>{manejoSubmit(e)}}>
        <div className="left-form col-lg-8 col-md-12 col-sm-12">
        <div className="mb-3">
                <label className="form-label color-main family-bitter">Nombre del Paciente: </label>
                <input type="text" className="form-control" placeholder="Ingresa el nombre del Paciente" name="paci_Nombres" value={inputs.paci_Nombres}
                onChange={(e)=>{manejarInputs(e)}}/>
            </div>
            <div className="mb-3">
                <label className="form-label color-main family-bitter">Apellido Paterno: </label>
                <input type="text" className="form-control" placeholder="Ingresa el nombre del Paciente" name="paci_ApPaterno" value={inputs.paci_ApPaterno}
                onChange={(e)=>{manejarInputs(e)}}/>
            </div>
            <div className="mb-3">
                <label className="form-label color-main family-bitter">Apellido Materno: </label>
                <input type="text" className="form-control" placeholder="Ingresa el nombre del Paciente" name="paci_ApMaterno" value={inputs.paci_ApMaterno}
                onChange={(e)=>{manejarInputs(e)}}/>
            </div>
            <div className="mb-3">
                <label className="form-label color-main family-bitter">Dirección: </label>
                <input type="text" className="form-control" placeholder="Ingresa el nombre del Paciente" name="paci_dir" value={inputs.paci_dir}
                onChange={(e)=>{manejarInputs(e)}}/>
            </div>
            <div className="mb-3">
                <label className="form-label color-main family-bitter">Teléfono: </label>
                <input type="text" className="form-control" placeholder="Ingresa el nombre del Paciente" name="paci_Celular" value={inputs.paci_Celular}
                onChange={(e)=>{manejarInputs(e)}}/>
            </div>
            <div className="mb-3">
                <label className="form-label color-main family-bitter">Nacimiento: </label>
                <input type="date" className="form-control" placeholder="Ingresa el nombre del Paciente" name="paci_FecNaci" value={inputs.paci_FecNaci}
                onChange={(e)=>{manejarInputs(e)}}/>
            </div>
            <div className="mb-3">
                <label className="form-label color-main family-bitter">Correo: </label>
                <input type="text" className="form-control" placeholder="Ingresa el nombre del Paciente" name="paci_Email" value={inputs.paci_Email}
                onChange={(e)=>{manejarInputs(e)}}/>
            </div>
            <button className=" btn buton-send my-2" type="submit">Guardar</button>
        </div>


            <div className=" d-flex flex-column img-cont mb-3 col-md-12 col-lg-4 c-sm-12">
                <img className="img-fluid mx-auto img-pac" src={inputs.paci_foto} alt=""/>
                <div className="mb-3">
                <label className="form-label mt-4">Cambio de Foto de Perfil</label>
                <input type="file" className="form-control" ref={inputFile} onChange={(e)=>{manejarFile(e)}}/>
            </div>
            </div>
          
        </form>
    </div>
  )
}
