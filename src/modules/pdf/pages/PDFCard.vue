<template lang="">
  <div class="card">
    <Card>
      <template #content>
        <h3 v-if="data!=null">{{data[0][2]}}</h3>
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
            optionLabel="name"
            placeholder="Select Countries"
            display="chip"
            class="w-full md:w-20rem"
          >
            <template #option="slotProps">
              <div class="contenedor-item">
                <div>
                  {{ slotProps.option.codigo }}
                </div>
                <div>
                  <InputNumber
                    v-model="slotProps.option.cantidad"
                    :inputId="slotProps.option.codigo"
                    showButtons
                    buttonLayout="horizontal"
                    :step="1"
                    decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success"
                    mode="decimal"
                    :min="0"
                    :max="100"
                    @click.stop
                  />
                </div>
              </div>
            </template>
          </MultiSelect>
          <MultiSelect
            v-else-if="selectedEmpresa != null"
            loading
            v-model="selectedInsumo"
            :options="insumos"
            optionLabel="name"
            placeholder="Select Countries"
            display="chip"
            class="w-full md:w-20rem"
          >
            <template #option="slotProps">
              <div class="contenedor-item">
                <div>
                  {{ slotProps.option.codigo }}
                </div>
                <div>
                  <InputNumber
                    v-model="slotProps.option.cantidad"
                    :inputId="slotProps.option.codigo"
                    showButtons
                    buttonLayout="horizontal"
                    :step="1"
                    decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success"
                    mode="decimal"
                    :min="0"
                    :max="100"
                    @click.stop
                  />
                </div>
              </div>
            </template>
          </MultiSelect>
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
import { actualizarUsuario } from "../../usuario/helpers/actualizarUsuario";

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
      selectedItem: null,
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
    this.procesarData();
  },
  methods: {
    async procesarData() {
      await getDataProcesada(this.ruta).then((x) => {
        this.data = x;
        console.log(this.data)
      });
    },
    async obtenerEmpresasUsuario() {
      await getEmpresas().then((x) => {
        this.empresas = x;
      });
    },
     


obtenerDatos() {


},
    async obtenerInsumos() {
  await getInsumos(this.selectedEmpresa).then((x) => {
    // this.insumos = x;
    this.insumos = x.map((empresa) => ({ ...empresa, cantidad: 1 }));
  });
},
    async actulizarCreditos() {
  const res = await actualizarUsuario("1725776650001");
},
    async generarExcel() {
  const datos = [];
  const insumo = toRaw(this.selectedInsumo[0]);
  const data = toRaw(this.data[0]);

  const tot = parseInt(data[0]) + parseInt(data[1]);
  var contador = 1;
  this.selectedInsumo.forEach((element) => {
    datos.push([
      "00000" + contador,
      element.codigo,
      element.subpartida,
      element.descripcion,
      element.tipoUnidad,
      data[0] * element.cantidad,
      "0",
      data[1] * element.cantidad,
      tot * element.cantidad,
      element.complementario,
      element.suplementario,
    ]);
    contador++;
  });


  generarExcelFachada(datos,data[2]);

  await this.actulizarCreditos();
},
  },
};
</script>
<style scoped>
div {
  margin-top: 15px;
}

button {
  margin-top: 10px;
}

.contenedor-item {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  grid-auto-rows: minmax(auto, auto);
}
</style>
