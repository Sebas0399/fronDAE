import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";


//Fachada
export const insertEmpresa= async(data)=>{
    return await insertEmpresaApi(data)
}

//Consumir
const insertEmpresaApi= async (data)=>{
    console.log(data)
    const url=getApiUrl('empresas')
    return await axios.post(url,data).then(r => r.data)
   
}