export const getRutasFachada = async (event) => {
  return getRutas(event);
};

//Consumir

const getRutas = async (event) => {
  const files = event.target.files;
  const paths = [];

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const extension = file.name.split(".").pop();

    if (extension !== "pdf") {
      alert("Seleccione un archivo PDF");
      return;
    }

    const promise = new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = () => {
        const dataUrl = reader.result;
        // Agregar la URL de datos al array de rutas
        paths.push(dataUrl);
        resolve();
      };

      reader.readAsDataURL(file);
    });

    await promise; // Esperar a que se complete la lectura antes de continuar
  }

  return paths;
};
