import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";


//Fachada
export const autenticarUsuario= async(usuario)=>{
    return await autenticarUsuarioAPI(usuario)
}

//Consumir
const autenticarUsuarioAPI= async (usuario)=>{
    const url=getApiUrl('auth')
    return await axios.post(url,usuario).then(r => r.data)
   
}