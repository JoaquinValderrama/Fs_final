import axios from "axios"

const URL = process.env.REACT_APP_API;

const crearMedico = async (nuevoMedico) =>{

    try {
        const headers ={
            "Content-Type": "application/json"
        }
        const endpoint = `${URL}/especialidad/${nuevoMedico.especialidadId}/medico`
        const {data,status} = await axios.post(endpoint,nuevoMedico,{headers})
        if(status===201){
            return data
        }else{
            throw Error("Error al obtener el lugar")
        }
    } catch (error) {
        return error
    }
}


export{
    crearMedico
}