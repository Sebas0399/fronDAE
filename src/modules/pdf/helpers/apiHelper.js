// apiHelper.js
import axios from "axios";

const apiUrl = "http://localhost:8080/api"; // Reemplaza con la URL de tu API


export const sendDataToApi = async (textData) => {
  const response = await axios.post(apiUrl + "/process-pdf", textData).then(r=>r.data);
  
  return response;
};
