<template>
  <Menu :model="items" />
  <Dialog
    v-model:visible="visible"
    modal
    header="Nueva"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="p-fluid">
      <span class="p-float-label">
        <InputText id="codigo" v-model="insumo.codigo" />
        <label for="codigo">Codigo</label>
      </span>
    </div>
    <div class="p-fluid">
      <span class="p-float-label">
        <InputText id="subpartida" v-model="insumo.subpartida" />
        <label for="subpartida">Subpartida</label>
      </span>
    </div>
    <div class="p-fluid">
      <span class="p-float-label">
        <InputText id="complementario" v-model="insumo.complementario" />
        <label for="complementario">Complementario</label>
      </span>
    </div>
    <div class="p-fluid">
      <span class="p-float-label">
        <InputText id="suplementario" v-model="insumo.suplementario" />
        <label for="suplementario">Suplementario</label>
      </span>
    </div>
    <div class="p-fluid">
      <span class="p-float-label">
        <InputText id="tipoUnidad" v-model="insumo.tipoUnidad" />
        <label for="tipoUnidad">Suplementario</label>
      </span>
    </div>
    <div class="p-fluid">
      <span class="p-float-label">
        <InputText id="descripcion" v-model="insumo.descripcion" />
        <label for="descripcion">Descripcion</label>
      </span>
    </div>
    <div class="p-fluid">
      <span class="p-float-label">
        <Button
          label="Guardar"
          icon="pi pi-external-link"
          @click="guardarInsumo"
        />
      </span>
    </div>
  </Dialog>
  <DataTable
    :value="insumos"
    tableStyle="min-width: 50rem"
    v-if="cargaCompleta"
  >
    <Column field="codigo" header="Codigo"></Column>
    <Column field="subpartida" header="Subpartida"></Column>
    <Column field="complementario" header="Complementario"></Column>

    <Column field="suplementario" header="Suplementario"></Column>
    <Column field="tipoUnidad" header="Tipo Unidad"></Column>

    <Column field="descripcion" header="Descripcion"></Column>
    <Column header="Accion">
      <template #body="{ value }">
        <Button
          label="Botón"
          icon="pi pi-check"
          @click="handleButtonClick(rowData)"
        ></Button>
      </template>
    </Column>
  </DataTable>

  <DataTable :value="insumosPosible" tableStyle="min-width: 50rem" v-else>
    <Column field="codigo" header="Codigo">
      <template #body> <Skeleton></Skeleton> </template
    ></Column>
    <Column field="subpartida" header="Subpartida">
      <template #body> <Skeleton></Skeleton> </template
    ></Column>
    <Column field="complementario" header="Complementario">
      <template #body> <Skeleton></Skeleton> </template
    ></Column>
    <Column field="suplementario" header="Suplementario">
      <template #body> <Skeleton></Skeleton> </template
    ></Column>
    <Column field="descripcion" header="Descripcion">
      <template #body> <Skeleton></Skeleton> </template
    ></Column>
    <Column header="Accion">
      <template #body="{ value }">
        <Button
          label="Botón"
          icon="pi pi-check"
          @click="handleButtonClick(rowData)"
        ></Button>
      </template>
    </Column>
  </DataTable>
</template>
<script>
import { getInsumos } from "../helpers/insumosEmpresa";
import { insertInsumo } from "../helpers/insertInsumo";

export default {
  data() {
    return {
      insumosPosible: new Array(4),
      cargaCompleta: false,
      insumos: null,
      visible: false,

      insumo: {
        codigo: null,
        subpartida: null,
        complementario: null,
        suplementario: null,
        descripcion: null,
        tipoUnidad:null,
        empresa: {
          ruc: this.ruc,
        },
      },
      items: [
        {
          label: "Añadir",
          icon: "pi pi-plus",
          command: () => {
            this.visible = true;
          },
        },
      ],
    };
  },
  mounted() {
    this.cargarInsumos();
    console.log(this.insumo);
  },
  methods: {
    async guardarInsumo() {
      await insertInsumo(this.insumo).then((z) => {
        //limpiar formulario
         this.cargarInsumos();
      });
    },
    async cargarInsumos() {
      this.cargaCompleta = false;

      await getInsumos(this.ruc).then((z) => {
        this.insumos = z;
        this.cargaCompleta = true;
        console.log(z);
      });
    },
  },
  props: {
    ruc: String,
  },
};
</script>
<style lang=""></style>
