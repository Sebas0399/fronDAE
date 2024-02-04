<template>
  <div v-if="creditos <= 0">
    <Message severity="warn">Creditos nulos</Message>
  </div>
  <div v-else>
    <div v-if="creditos <= 5">
      <Message severity="info">Creditos bajos</Message>
    </div>
    <div>
      <div class="custom-file">
        <input
          type="file"
          class="custom-file-input"
          id="customFile"
          @change="cargarPdf"
          multiple="true"
        />
        <label class="custom-file-label" for="customFile"
          >Seleccionar Archivo</label
        >
      </div>
      <h1>{{ respuesta }}</h1>
    </div>
    <div class="grid-container">
      <div v-for="(item, index) in pdfRutas" :key="index">
        <PDFCard :ruta="item"></PDFCard>
      </div>
    </div>
  </div>
</template>
<script>
// Ajusta la ruta según la ubicación real de tu archivo helper
import { getRutasFachada } from "./helpers/fileHelper";
import { getUsuario } from "@/modules/usuario/helpers/getUsuario";
import PDFCard from "./pages/PDFCard.vue";
export default {
  components: {
    PDFCard,
  },
  data() {
    return {
      creditos: null,
      loading: false,
      respuesta: null,
      items: null,
      pdfRutas: [],
    };
  },
  mounted() {
    this.obetnerUsuario();
  },
  methods: {
    async cargarPdf(event) {
      this.pdfRutas = await getRutasFachada(event);
    },
    async obetnerUsuario() {
      const usu = await getUsuario();
      this.creditos = usu.creditos;
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}
.custom-file {
  margin-top: 20px;
}
.custom-file-input {
  display: none;
}

.custom-file-label {
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
</style>
