import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";
import cedulaService  from "../../utils/tokenUtils";


//Fachada
export const actualizarUsuario= async()=>{
    const usuarioCedula=cedulaService.getCedula();
    return await actualizarUsuarioApi(usuarioCedula)
}

//Consumir
const actualizarUsuarioApi= async (usuarioCedula)=>{
    const url=getApiUrl('usuarios/'+usuarioCedula)
    return await axios.put(url).then(r => r.data)
   
}