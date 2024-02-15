import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";

//Fachada
export const autenticarUsuario= async(usuario)=>{
    return await autenticarUsuarioAPI(usuario)
}
export const renovarUsuario= async(token)=>{
    return await renovarUsuarioAPI(token)
}
//Consumir
const autenticarUsuarioAPI= async (usuario)=>{
    const url=getApiUrl('auth')
    return await axios.post(url,usuario).then(r => r.data)
   
}

const renovarUsuarioAPI= async (token)=>{
    const url=getApiUrl('auth/refresh-token')
    return await axios.post(url,token,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then(r => r.data)
   
}