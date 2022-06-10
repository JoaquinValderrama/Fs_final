import axios from "axios"

const URL = process.env.REACT_APP_API;


const eliminarPaciente = async(idPac)=>{
    try {
        const {status} =await axios.delete(`${URL}/paciente/${idPac}`)
        if(status ===200){
            return "ok"
            console.log(status)
        }else{
            throw Error("Error al eliminar lugar")
        }
    } catch (error) {
        
    }
}
const getPaciente = async() =>{
    try {
        const {data,status} = await axios.get(`${URL}/paciente`) 
        if(status===200){
            return data
        }else{
            throw Error("Error al obtener el lugar")
        }
    } catch (error) {
        return error       
    }
}

const editarPaciente = async(idPac,pacEdit) =>{
    try {
        const headers ={
            "Content-Type":"application/json"
        }
        const endpoint = `${URL}/paciente/${idPac}`
        const {data,status} = await axios.put(endpoint,pacEdit,{headers})
        if(status ===200){
            return data
        }else{
            throw Error("Error al editar lugar")
        }
    } catch (error) {
        return error
    }
}

const getPacientebyId = async (idPac)=>{
    try {
        const{data,status} = await axios.get(`${URL}/paciente/${idPac}`)
        if(status===200){
            return data
        }else{
            throw Error("Error al obtener el lugar")
        }
    } catch (error) {
        return error
    }
}
export {
    getPaciente,
    eliminarPaciente,
    editarPaciente,
    getPacientebyId
}
