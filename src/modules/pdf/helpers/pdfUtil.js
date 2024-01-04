import { sendDataToApi } from "./apiHelper";
import * as pdfjsLib from "pdfjs-dist/webpack.mjs";
import "pdfjs-dist/build/pdf.worker.mjs";
//Fachada
export const getDataProcesada = async (pdfUrl) => {
  return extractTextFromPdf(pdfUrl);
};

//Consumir


  const  extractTextFromPdf= async (pdfUrl) =>{
    var extractedText= new Map()


    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

    const maxPages = pdf.numPages;

    for (let pageNumber = 1; pageNumber <= maxPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();

      const texts = textContent.items.map((item) => item.str);

      // Update the Map with a list of strings
      extractedText.set(pageNumber, texts);
    }

    return await sendDataToApi(
      Object.fromEntries(extractedText)
    );

    
  }
  
