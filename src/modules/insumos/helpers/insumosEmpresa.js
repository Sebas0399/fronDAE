import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";


//Fachada
export const getInsumos= (empresaRuc)=>{
    return  getInsumosEmpresaAPI(empresaRuc)
}

//Consumir
const getInsumosEmpresaAPI= async (empresaRuc)=>{
    const url = getApiUrl('empresas/' + empresaRuc + '/insumos');
    const response = await axios.get(url);
    return response.data;
   
}