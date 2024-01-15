import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";


//Fachada
export const deleteEmpresa= async(id)=>{
    return await eliminarEmpresaApi(id)
}

//Consumir
const eliminarEmpresaApi= async (id)=>{
    const url = getApiUrl(`empresas/${id}`);
    console.log(url)
  return await axios.delete(url).then(r => r.data);
};
   
