<template>
  <div>
    <form>
      <input type="file" ref="pdfFile" @change="onFileChange">
    </form>
    <div v-if="loading">Processing PDF...</div>
    <div v-else>
      <div v-for="(texts, pageNumber) in extractedText" :key="pageNumber">
        <h2>Page {{ pageNumber }}:</h2>
        <ul>
          <li v-for="(text, index) in texts" :key="index">
            <h1 v-for="a in text">{{ a }}</h1>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import * as pdfjsLib from 'pdfjs-dist/webpack.mjs';
import 'pdfjs-dist/build/pdf.worker.mjs';
import { sendDataToApi } from './helpers/apiHelper'; // Ajusta la ruta según la ubicación real de tu archivo helper

export default {
  data() {
    return {
      extractedText: new Map(), // Use a Map to store text content for each page
      loading: false,
    };
  },
  methods: {
    async extractTextFromPdf(pdfUrl) {
      this.loading = true;

      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      const maxPages = pdf.numPages;

      for (let pageNumber = 1; pageNumber <= maxPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const textContent = await page.getTextContent();
        const texts = textContent.items.map(item => item.str);

        // Update the Map with a list of strings
        this.extractedText.set(pageNumber, texts);
      }

      const datos=await sendDataToApi(Object.fromEntries(this.extractedText));
      console.log(datos);

      this.loading = false;
    },

    onFileChange(event) {
      const file = event.target.files[0];
      const extension = file.name.split('.').pop();

      if (extension !== 'pdf') {
        alert('Please select a PDF file');
        return;
      }

      const reader = new FileReader();

      reader.onload = async () => {
        const dataUrl = reader.result;

        await this.extractTextFromPdf(dataUrl);
      };

      reader.readAsDataURL(file);
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
