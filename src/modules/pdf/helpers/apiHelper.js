// apiHelper.js
import axios from 'axios';

const apiUrl = 'http://localhost:8080/api'; // Reemplaza con la URL de tu API

export async function sendDataToApi(textData) {
    console.log(textData)
  try {
    const response = await axios.post(apiUrl+"/process-pdf", { textData });
    return response.data;
  } catch (error) {
    throw error;
  }
}
