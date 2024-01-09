<template>
  <DataTable
    :value="insumos"
    tableStyle="min-width: 50rem"
    v-if="cargaCompleta"
  >
    <Column field="codigo" header="Codigo"></Column>
    <Column field="subpartida" header="Subpartida"></Column>
    <Column field="complementario" header="Complementario"></Column>

    <Column field="suplementario" header="Suplementario"></Column>

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
      <template #body>
        <Skeleton></Skeleton> </template
    ></Column>
    <Column field="subpartida" header="Subpartida">
      <template #body>
        <Skeleton></Skeleton> </template
    ></Column>
    <Column field="complementario" header="Complementario">
      <template #body>
        <Skeleton></Skeleton> </template
    ></Column>
    <Column field="suplementario" header="Suplementario">
      <template #body>
        <Skeleton></Skeleton> </template
    ></Column>
    <Column field="descripcion" header="Descripcion">
      <template #body>
        <Skeleton></Skeleton> </template
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
export default {
  data() {
    return {
      insumosPosible: new Array(4),
      cargaCompleta: false,
      insumos: null,
      visible: false,
    };
  },
  mounted() {
    this.cargarInsumos();
  },
  methods: {
    async cargarInsumos() {
      await getInsumos(this.ruc).then((z) => {
        this.insumos = z;
        this.cargaCompleta = true;
        console.log(z)
      });
    },
  },
  props: {
    ruc: String,
  },
};
</script>
<style lang=""></style>
