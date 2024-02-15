//const API_URL = "https://daeapi.azurewebsites.net";
const API_URL = "http://localhost:8080";

export function getApiUrl(endpoint) {
    return `${API_URL}/${endpoint}`;
  }
  