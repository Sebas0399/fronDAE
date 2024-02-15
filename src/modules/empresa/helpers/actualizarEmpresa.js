import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";


//Fachada
export const updateEmpresa= async(data)=>{
    return await actualizarEmpresaApi(data)
}

//Consumir
const actualizarEmpresaApi= async (data)=>{
    const url = getApiUrl(`empresas`);
  return await axios.put(url,data).then(r => r.data);
};
   
