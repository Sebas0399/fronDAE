import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";


//Fachada
export const getEmpresas= async(usuarioCedula)=>{
    return await getEmpresasUsuarioApi(usuarioCedula)
}

//Consumir
const getEmpresasUsuarioApi= async (usuarioCedula)=>{
    const url=getApiUrl('usuarios/'+usuarioCedula+'/empresas')
    return await axios.get(url).then(r => r.data)
   
}