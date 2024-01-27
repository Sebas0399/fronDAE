import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";


//Fachada
export const actualizarUsuario= async(usuarioCedula)=>{
    return await actualizarUsuarioApi(usuarioCedula)
}

//Consumir
const actualizarUsuarioApi= async (usuarioCedula)=>{
    const url=getApiUrl('usuarios/'+usuarioCedula)
    return await axios.put(url).then(r => r.data)
   
}