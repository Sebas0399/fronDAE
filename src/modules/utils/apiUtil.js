const API_URL = "https://daeapi.azurewebsites.net/";

export function getApiUrl(endpoint) {
    return `${API_URL}/${endpoint}`;
  }
  