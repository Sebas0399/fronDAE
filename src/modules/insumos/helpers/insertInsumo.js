import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";


//Fachada
export const insertInsumo= async(data)=>{
 
        return await insertInsumoAPI(data)

   
}

//Consumir
const insertInsumoAPI= async (data)=>{
    
        const url=getApiUrl('insumos')
        return await axios.post(url,data).then(r => r.data)
    
    
    
   
}