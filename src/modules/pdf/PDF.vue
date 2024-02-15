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
          accept="application/pdf"
        />
        <label class="custom-file-label" for="customFile"
          >Seleccionar Archivo</label
        >
      </div>
      <h1>{{ respuesta }}</h1>
    </div>
    <div class="grid-container">
      <div v-for="(item, index) in pdfRutas" :key="index">
        <PDFCard :ruta="item" ref="childrenRefs" @procesar="procesarChild(index)"></PDFCard>
      </div>
    </div>
    <div>
      <Button  @click="procesarTodos">Procesar todos</Button>
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
      children: [] // Almacena los datos de los componentes hijos
    };
  },
  mounted() {
    this.obetnerUsuario();
  },
  methods: {
    async cargarPdf(event) {
    this.pdfRutas = await getRutasFachada(event);
    // Espera a que se carguen todas las referencias de los componentes hijos
    this.$nextTick(() => {
      this.children = this.$refs.childrenRefs || [];
    });
  },
  async procesarTodos() {
    // Verifica si todas las referencias de los componentes hijos se han cargado
    if (this.children.length !== this.pdfRutas.length) {
      // Si no, espera un momento y vuelve a intentarlo
      setTimeout(this.procesarTodos, 200);
      return;
    }
    // Itera sobre todos los componentes hijos y llama a procesarChild para cada uno
    this.children.forEach((child, index) => {
      this.procesarChild(index);
    });
  },
  procesarChild(index) {
    // Llama al método generarExcel en el componente hijo específico
    this.children[index].generarExcel();
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
