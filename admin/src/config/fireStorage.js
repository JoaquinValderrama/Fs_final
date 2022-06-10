import { storage } from "./firebaseConfig";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {v4} from "uuid"

const subirArchivo = (archivo) =>{
    return  new Promise((resolve,reject)=>{

        // crear una referencia de donde y con que nombre vamos a guardar el archivo 
        const extension = archivo.type.split("/")[1]
        const nombreUUID = v4()
        const referenciaStorage = ref(storage, `fotos/${nombreUUID}.${extension}`)
        // creamos una referencia a la tarea de subida del archivo que se ehecuta mediante 
        // uploadBytesResumable(refStorage, archivo _que_va_a_subir)
        const tareaSubida = uploadBytesResumable(referenciaStorage, archivo)

        // .on -> es una especie de listener que va a escuchar al evento 'state_changed' con el objetivo de supervvissr a subid
        // si es que hay un error y el fin de la subida medaite 3 callbacks
        tareaSubida.on('state_changed',
        
        // supervisar la subida del archivo
        ()=>{},
        // en caso de error al subir
        (error) => {reject((error))},
        // cuando ya finalizo la subida del archivo
        ()=>{
            getDownloadURL(referenciaStorage)
            .then((url)=>{
                resolve(url)
            })
        }
        )
    })


}

export {
    subirArchivo
}

