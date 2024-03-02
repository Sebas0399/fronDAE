import axios from "axios";
import { getApiUrl } from "../../utils/apiUtil";

import cedulaService from '../../utils/tokenUtils';

//Fachada
export const insertEmpresa = async (data) => {
  data.usuario.cedula = cedulaService.getCedula();
  return await insertEmpresaApi(data);
};

//Consumir
const insertEmpresaApi = async (data) => {
  const url = getApiUrl("empresas");
  return await axios.post(url, data).then((r) => r.data);
};
