<template>
  <div v-if="creditos === null">
    <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
      animationDuration=".9s" aria-label="Custom ProgressSpinner" />
  </div>
  <div v-else-if="creditos <= 0">
    <Message severity="warn">Creditos nulos</Message>
  </div>
  <div v-else>
    <div v-if="creditos <= 5">
      <Message severity="info">Creditos bajos</Message>
    </div>
    <Dropdown v-if="empresas != null" v-model="selectedEmpresa" :options="empresas" filter optionValue="ruc"
      optionLabel="nombre" placeholder="Seleccione una empresa" class="w-full md:w-14rem mt-2">
    </Dropdown>
    <Dropdown v-else v-model="selectedEmpresa" :options="empresas" filter loading optionValue="ruc" optionLabel="nombre"
      placeholder="Seleccione una empresa" class="w-full md:w-14rem">

    </Dropdown>
    <div>
      <div class="custom-file" v-if="(selectedEmpresa != null)">
        <div v-if="insumos === null">
          <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
            animationDuration=".9s" aria-label="Custom ProgressSpinner" />
        </div>
        <div v-else>
          <input type="file" class="custom-file-input" id="customFile" @change="cargarPdf" multiple="true"
            accept="application/pdf" />
          <label class="custom-file-label" for="customFile">Subir DAE</label>
        </div>
      </div>
    </div>
    <div class="grid-container">
      <div v-for="(item, index) in pdfRutas" :key="index">
        <PDFCard :ruta="item" :insumos="insumos" ref="childrenRefs" @procesar="procesarChild(index)"
          :selectedEmpresa="selectedEmpresa">
        </PDFCard>
      </div>
    </div>
    <div v-if="pdfRutas.length > 0">
      <Button @click="procesarTodos">Procesar todos</Button>
    </div>
  </div>
</template>

<script>
// Ajusta la ruta según la ubicación real de tu archivo helper
import { getRutasFachada } from "./helpers/fileHelper";
import { getUsuario } from "@/modules/usuario/helpers/getUsuario";
import { getEmpresas } from "@/modules/empresa/helpers/empresasUsuario";
import { getInsumos } from "@/modules/insumos/helpers/insumosEmpresa";

import PDFCard from "./pages/PDFCard.vue";
export default {
  components: {
    PDFCard,
  },

  data() {
    return {
      empresas: null,
      insumos: null,
      creditos: null,
      selectedEmpresa: null,
      loading: false,
      items: null,
      pdfRutas: [],
      children: [],
      lastFileId: null,

    };
  },
  mounted() {
    this.obetnerUsuario();
    this.obtenerEmpresasUsuario();

  },
  watch: {

    selectedEmpresa(nuevo, old) {
      this.pdfRutas = []
      if (nuevo != null) {
        getInsumos(this.selectedEmpresa).then((x) => {
          this.insumos = x.map((empresa) => ({ ...empresa, cantidad: 1 }));
        });
      }

    }
  },
  methods: {


    async obtenerEmpresasUsuario() {
      await getEmpresas().then((x) => {
        this.empresas = x;
      });
    },
    async obtenerInsumos() {
      await getInsumos(this.selectedEmpresa).then((x) => {
        // this.insumos = x;
        this.insumos = x.map((empresa) => ({ ...empresa, cantidad: 1 }));
        console.log(this.insumos)
      });
    },
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
  background-color: #3c54cc;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
</style>
