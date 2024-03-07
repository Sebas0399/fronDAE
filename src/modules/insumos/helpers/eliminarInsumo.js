import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";


//Fachada
export const deleteInsumo= async(id)=>{
    return await eliminarInsumoApi(id)
}

//Consumir
const eliminarInsumoApi= async (id)=>{
    const url = getApiUrl(`insumos/${id}`);
  return await axios.delete(url).then(r => r.data);
};
   
