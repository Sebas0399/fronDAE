import * as jose from "jose";

// Define la función getCedula como una clase para aplicar el patrón Singleton
class CedulaService {
  constructor() {
    // Puedes inicializar aquí cualquier estado que necesites
  }

  getToken() {
    const tokenString = localStorage.getItem("token");
    if (tokenString !== null) {
      return tokenString;
    } else {
      return null;
    }
  }

  getCedula() {
    const token = this.getToken();
    if (token !== null) {
      return jose.decodeJwt(token, { complete: true }).name;
    } else {
      return null;
    }
  }
}

// Crea una única instancia de la clase para mantener el Singleton
const cedulaServiceInstance = new CedulaService();

// Exporta la instancia en lugar de la clase directamente
export default cedulaServiceInstance;
