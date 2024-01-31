import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";
import cedulaService from '../../utils/tokenUtils';

//Fachada
export const getEmpresas= async()=>{
    const usuarioCedula = cedulaService.getCedula();
    return await getEmpresasUsuarioApi(usuarioCedula)
}

//Consumir
const getEmpresasUsuarioApi= async (usuarioCedula)=>{
    const url=getApiUrl('usuarios/'+usuarioCedula+'/empresas')
    return await axios.get(url).then(r => r.data)
   
}