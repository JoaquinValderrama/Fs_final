import axios from "axios";

// const URL = "https://62901abd665ea71fe12d54c8.mockapi.io/especialidad"
const URL = process.env.REACT_APP_API;

const getEspecialidades = async()=>{
    try {

        const {data,status} = await axios.get(`${URL}/especialidad`)
        if(status===200){
            return data
        }else{
            throw Error("Error al obtener el lugar")
        }
    } catch (error) {
        return error
    }

}

const getEspecialidadesPorId = async(idEsp)=>{
    try {

        const {data,status} = await axios.get(`${URL}/especialidad/${idEsp}`)
        if(status===200){
            return data
        }else{
            throw Error("Error al obtener el lugar")
        }
    } catch (error) {
        return error
    }

}


const eliminarEspecialidad = async(idEsp)=>{
    try {
        // const endpoint = `${URL}/especialidad/${idEsp}`
        const {status} = await axios.delete(`${URL}/especialidad/${idEsp}`)
        if(status ===200){
            return "ok"
            console.log(status)
        }else{
            throw Error("Error al eliminar lugar")
        }
    } catch (error) {
        return error
    }
}

const editarEspecialidad = async (idEsp, espEdit) => {
    try {
        const headers ={
            "Content-type":"application/json"
        }
        const endpoint = `${URL}/especialidad/${idEsp}`
        const {data,status} =await axios.put(endpoint,espEdit,{headers})
        if(status ===200){
            return data
        }else{
            throw Error("Error al editar lugar")
        }
    } catch (error) {
        return error
    }
} 

const crearEspecialidad = async(nuevaEspecialidad) =>{
    try {
        const headers = {
            "Content-Type":"application/json"
        }
        const endpoint= `${URL}/especialidad`
        const{data,status} = await axios.post(endpoint,nuevaEspecialidad,{headers})

        if(status===201){
            return data
        }else{
            throw "Error al enviar data"
        }
    } catch (error) {
        throw error
    }
}
export{
    getEspecialidades,
    eliminarEspecialidad,
    editarEspecialidad,
    getEspecialidadesPorId,
    crearEspecialidad
}