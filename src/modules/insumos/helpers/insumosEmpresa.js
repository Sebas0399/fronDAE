import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";


//Fachada
export const getInsumos= async(empresaRuc)=>{
    return await getInsumosEmpresaAPI(empresaRuc)
}

//Consumir
const getInsumosEmpresaAPI= async (empresaRuc)=>{
    console.log(empresaRuc)
    const url=getApiUrl('empresas/'+empresaRuc+'/insumos')
    return await axios.get(url).then(r => r.data)
   
}