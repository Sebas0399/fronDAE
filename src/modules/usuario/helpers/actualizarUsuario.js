import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";
import cedulaService  from "../../utils/tokenUtils";


//Fachada
export const actualizarUsuario= async()=>{
    const usuarioCedula=cedulaService.getCedula();
    return await actualizarUsuarioApi(usuarioCedula)
}
export const actualizarUsuarioBultos= async(bultos)=>{
    const usuarioCedula=cedulaService.getCedula();
    return await actualizarUsuarioBultosApi(usuarioCedula,bultos)
}
//Consumir
const actualizarUsuarioApi= async (usuarioCedula)=>{
    const url=getApiUrl('usuarios/'+usuarioCedula)
    return await axios.put(url).then(r => r.data)
   
}
const actualizarUsuarioBultosApi= async (usuarioCedula,bultos)=>{

    
    const url=getApiUrl('usuarios/'+usuarioCedula+'?consumo='+bultos)
    return await axios.put(url,bultos).then(r => r.data)
   
}