<template lang="">
  <div >
    <Card>
      <template #content>
        <h3 v-if="data != null">{{ data[0][2] }}</h3>
        <Image :src="require('@/assets/pdfLogo.png')" alt="Image" width="50" />
        <div>
          <!-- Añadir mas items -->
          <div v-for="(item, index) in itemCount" :key="index">
            <MultiSelect
              v-if="insumos != null"
              v-model="selectedInsumo[index]"
              :options="insumos"
              optionLabel="name"
              placeholder="Seleccione el insumo"
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
              v-else
              loading
              v-model="selectedInsumo[index]"
              :options="insumos"
              optionLabel="name"
              placeholder="Seleccione el insumo"
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

          <Button @click="itemAdd">Añadir</Button>
        </div>
        <Button @click="generarExcel">Procesar</Button>
      </template>
    </Card>
  </div>
</template>

<script>
import { getDataProcesada } from "../helpers/pdfUtil";
import { generarExcelFachada } from "../helpers/excelUtil";
import { actualizarUsuario,actualizarUsuarioBultos } from "../../usuario/helpers/actualizarUsuario";

import { toRaw } from "vue";

export default {
  props: {
    ruta: String,
    //selectedEmpresa: String,
    insumos:Object
  },
  data() {
    return {
      data: null,
      selectedInsumo: [],
      selectedItem: null,
      itemCount: 1,
    };
  },

  mounted() {
    this.procesarData();
    console.log(this.insumos)
  },
  methods: {
    itemAdd() {
      this.itemCount++;
      this.selectedInsumo.push([]);
      for (let index = 0; index < this.selectedInsumo.length; index++) {
        console.log(this.selectedInsumo[index]);
      }
    },
    async procesarData() {
      await getDataProcesada(this.ruta).then((x) => {
        this.data = x;
        console.log(this.data);
      });
    },

    
    
    async actulizarCreditos(totalBultos) {
      const res = await actualizarUsuarioBultos(totalBultos);
    },
    async generarExcel() {
      const datos = [];
      const data = toRaw(this.data[0]);

      const tot = parseInt(data[0]) + parseInt(data[1]);
      var contador = 1;
      var totalBultos=0;
      this.selectedInsumo.forEach((element) => {
        totalBultos+=totalBultos+parseInt(data[0])
        element.forEach((dato) => {
          datos.push([
            "00000" + contador,
            dato.codigo,
            dato.subpartida,
            dato.descripcion,
            dato.tipoUnidad,
            data[0] * dato.cantidad,
            "0",
            element.calculaMerma?data[1] * dato.cantidad:0,
            element.calculaMerma?tot * dato.cantidad:data[0] * dato.cantidad,
            dato.complementario,
            dato.suplementario,
          ]);
          contador++;
        });
      });

      generarExcelFachada(datos, data[2]);

      await this.actulizarCreditos(totalBultos);
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
.card{
  display: flex;
  flex-direction: column;
}
</style>
