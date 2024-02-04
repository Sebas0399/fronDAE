// apiHelper.js
import axios from "axios";
import { getApiUrl  } from "../../utils/apiUtil";

const apiUrl = getApiUrl("api/process-pdf"); // Reemplaza con la URL de tu API


export const sendDataToApi = async (textData) => {
  const response = await axios.post(apiUrl , textData).then(r=>r.data);
  
  return response;
};
