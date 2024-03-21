import axios from "axios";
const token="Ddvj9E51W3SJKNfrvH94KJiZyAAVHU8BHuClWhjrfB-LMXMjasTQE2Uv4ttrT1w5io-wX2ZwW_A4USsvwq_9i3NkkbdBjWEiSA9Y6hvHQ6KhYAYxBPJ9HSVMc27lST122NyeNAivNb-q9fllHOcBxjHdKdhu1Wc5vdCMBO8assIWEFNZ6Jg4qgPBAheUNsZ1gSj0DWd3-TccfhR_ywCrvEhd0lMS5dfSp4NgbaEgrcTqq_dkC2xr5Nk6TGCurvz33yjc0AH6Myn8srN6k_a9ky14zbp76727vIpArHvsg4CiumQwfGgwjtfmw05fl55AFSg26Q";
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
