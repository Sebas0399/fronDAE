import axios from "axios";
import { getApiUrl } from "../../utils/apiUtil";
import cedulaService  from "../../utils/tokenUtils";

//Fachada
export const getUsuario = async () => {
  const usuarioCedula = cedulaService.getCedula();
  console.log(usuarioCedula)
  return await getUsuarioApi(usuarioCedula);
};

//Consumir
const getUsuarioApi = async (usuarioCedula) => {
  const url = getApiUrl("usuarios/" + usuarioCedula);
  return await axios.get(url).then((r) => r.data);
};
