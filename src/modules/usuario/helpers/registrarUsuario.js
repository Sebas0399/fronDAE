import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";


//Fachada
export const registroUsuario= async(usuario)=>{
    console.log(usuario)
    return await registroUsuarioApi(usuario)
}

//Consumir
const registroUsuarioApi= async (usuario)=>{
    const url=getApiUrl('usuarios/registro')
    return await axios.post(url,usuario).then(r => r.data)
   
}