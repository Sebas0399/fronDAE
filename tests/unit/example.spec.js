import { getCedula } from '@/modules/utils/tokenUtils';

describe('getCedula', () => {
  it('should return null when token is not present', () => {
    // Simula el caso en el que el token no está presente en localStorage
    localStorage.removeItem('token');
    
    // Ejecuta la función y verifica que devuelva null
    expect(getCedula()).toBeNull();
  });

  it('should decode token when token is present', () => {
    // Simula el caso en el que el token está presente en localStorage
    const fakeToken = '...'; // Puedes reemplazar esto con un token JWT válido
    localStorage.setItem('token', fakeToken);

    // Ejecuta la función y verifica que devuelva el resultado esperado
    const result = getCedula();
    // Asegúrate de ajustar esto según lo que esperas obtener al decodificar el token
    expect(result).toEqual({ /* ... */ });
  });
});