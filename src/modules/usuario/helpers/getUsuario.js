import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";


//Fachada
export const getUsuario= async(usuarioCedula)=>{
    return await getUsuarioApi(usuarioCedula)
}

//Consumir
const getUsuarioApi= async (usuarioCedula)=>{
    const url=getApiUrl('usuarios/'+usuarioCedula)
    return await axios.get(url).then(r => r.data)
   
}