<template lang="">
  <div class="card">
    <Card>
      <!-- <template #title> </template> -->

      <template #content>
        <Image :src="require('@/assets/pdfLogo.png')" alt="Image" width="50" />
        <div class="flex align-items-center">
          <Dropdown
            v-if="empresas != null"
            v-model="selectedEmpresa"
            :options="empresas"
            filter
            optionValue="ruc"
            optionLabel="nombre"
            placeholder="Seleccione una empresa"
            class="w-full md:w-14rem"
          >
          </Dropdown>
          <Dropdown
            v-else
            v-model="selectedEmpresa"
            :options="empresas"
            filter
            loading
            optionValue="ruc"
            optionLabel="nombre"
            placeholder="Seleccione una empresa"
            class="w-full md:w-14rem"
          >
          </Dropdown>

          <MultiSelect
            v-if="insumos != null"
            v-model="selectedInsumo"
            :options="insumos"
            :selectAll="false"
            optionLabel="codigo"
            placeholder="Seleccione el insumo"
            :maxSelectedLabels="3"
            class="w-full md:w-20rem"
          />
          <MultiSelect
            v-else-if="selectedEmpresa != null"
            loading
            v-model="selectedInsumo"
            :options="insumos"
            :selectAll="false"
            optionLabel="codigo"
            placeholder="Seleccione el insumo"
            :maxSelectedLabels="3"
            class="w-full md:w-20rem"
          />
        </div>
        <Button @click="generarExcel">Procesar</Button>
      </template>
    </Card>
  </div>
</template>
<script>
import { getDataProcesada } from "../helpers/pdfUtil";
import { getEmpresas } from "@/modules/empresa/helpers/empresasUsuario";
import { getInsumos } from "@/modules/insumos/helpers/insumosEmpresa";
import { generarExcelFachada } from "../helpers/excelUtil";
import { toRaw } from "vue";

export default {
  props: {
    ruta: String,
  },
  data() {
    return {
      data: null,
      empresas: null,
      selectedEmpresa: null,
      insumos: null,
      selectedInsumo: null,
      selectedCities: null,
    };
  },
  watch: {
    selectedEmpresa(newEmpresa, oldEmpresa) {
      if (newEmpresa != null) {
        this.obtenerInsumos();
      }
    },
  },
  mounted() {
    this.obtenerEmpresasUsuario();
  },
  methods: {
    async procesarData() {
      await getDataProcesada(this.ruta).then((x) => {
        this.data = x;
      });
    },
    async obtenerEmpresasUsuario() {
      await getEmpresas("1725776650001").then((x) => {
        this.empresas = x;
      });
    },
    async obtenerInsumos() {
      this.insumos = await getInsumos(this.selectedEmpresa);
    },
    async generarExcel() {
      await this.procesarData();
      const datos = [];
      const insumo = toRaw(this.selectedInsumo[0]);
      const data = toRaw(this.data[0]);
   

      const tot = parseInt(data[0]) + parseInt(data[1]);
      datos.push([
        "",
        insumo.codigo,
        insumo.subpartida,
        insumo.descripcion,
        insumo.tipoUnidad,
        data[0],
        "0",
        data[1],
        tot,
        insumo.complementario,
        insumo.suplementario,
      ]);

      generarExcelFachada(datos);
    },
  },
};
</script>
<style lang=""></style>
