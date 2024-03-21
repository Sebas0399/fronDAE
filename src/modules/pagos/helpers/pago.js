import axios from "axios";
const token="d_C64fy9hZ9EG0cMEl-KhiB6kql0lDtDniD7Not1isnsvcuo5UfYs-uoNbK_ShP-zRip-VRntkWSuKTR6nGlFidJBi2yFkXcsFCASFJF4eu3HmDVSaQOWX4r-ly7OEZLcVaryRYcFBijX0VqHsL12Lrgwq7BLnyjzVHza-KNvQJNxY5aYLWB2hK6BECLaZ4GIZPPbiNnRw4tt43JsfTU-EXTosl3RukcM6jk6qa8Bsqdb91EULWJ9uGhe6JQ7PM7LO1NfmtCmO6D6G_YIZ6fQuzNJj8lMij8Hl4IKBodn9BN-TNzFxulhv29ZZ_SUGYujFe4sg"
const url="https://appdeveloper.payphonetodoesposible.com/";
//Fachada
export const pagarFachada = async (precio) => {
  return await pagarApi(precio);
};

//Consumir
const pagarApi = async (precio) => {
    const header={"Authorization":"Bearer "+token }
  return await axios.post(url,precio,header).then((r) => r.data);
};
