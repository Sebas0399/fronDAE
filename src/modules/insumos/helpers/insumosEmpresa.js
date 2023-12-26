import axios from "axios";
import { getInsumos  } from "../../utils/apiUtil";


//Fachada
export const getInsumos= async(empresaRuc)=>{
    return await getInsumosEmpresaAPI(empresaRuc)
}

//Consumir
const getInsumosEmpresaAPI= async (empresaRuc)=>{
    const url=getApiUrl(concat('/empresas/',empresaRuc,'/insumos'))
    return await axios.get(url).then(r => r.data)
   
}