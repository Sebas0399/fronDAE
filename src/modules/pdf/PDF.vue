<template>
  <div>
    <form>
      <input type="file" ref="pdfFile" @change="cargarPdf" multiple="true" />
    </form>
    <h1>{{ respuesta }}</h1>
  </div>
  <div class="grid-container">
    <div v-for="(item, index) in pdfRutas" :key="index">
      <PDFCard :ruta=item></PDFCard>
    </div>
  </div>
</template>
<script>
// Ajusta la ruta según la ubicación real de tu archivo helper
import { getRutasFachada } from "./helpers/fileHelper";

import PDFCard from "./pages/PDFCard.vue";
export default {
  components: {
    PDFCard,
  },
  data() {
    return {
      loading: false,
      respuesta: null,
      items: null,
      pdfRutas: [],
    };
  },
  methods: {
    async cargarPdf(event) {
      console.log()
      this.pdfRutas=(await getRutasFachada(event));
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
.grid-container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}
</style>
