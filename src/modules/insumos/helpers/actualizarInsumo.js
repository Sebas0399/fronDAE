import axios from "axios";
import { getApiUrl } from "../../utils/apiUtil";


//Fachada
export const updateInsumo = async (data) => {
    return await actualizarInsumoApi(data)
}

//Consumir
const actualizarInsumoApi = async (data) => {
    const url = getApiUrl(`insumos`);
    return await axios.put(url, data).then(r => r.data);
};

