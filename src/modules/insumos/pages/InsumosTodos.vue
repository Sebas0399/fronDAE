<template>

  <Menu :model="items" />
  <Toast />
  <Dialog v-model:visible="visible" modal header="Nueva" :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <InsumoInsertar @insertado="insertado" :ruc="ruc"></InsumoInsertar>


  </Dialog>
  <DataTable :value="insumos" tableStyle="min-width: 50rem" v-if="cargaCompleta">
    <Column field="codigo" header="Codigo"></Column>
    <Column field="subpartida" header="Subpartida"></Column>
    <Column field="complementario" header="Complementario"></Column>

    <Column field="suplementario" header="Suplementario"></Column>
    <Column field="tipoUnidad" header="Tipo Unidad"></Column>

    <Column field="descripcion" header="Descripcion"></Column>

    <Column header="Merma">
      <template #body="slotProps">
        <Checkbox :modelValue="slotProps.data.calculaMerma" readonly="true" :binary="true"/>
      </template>
    </Column>

    <Column header="Accion">

      <template #body="{ value }">
        <Button label="Botón" icon="pi pi-check" @click="handleButtonClick(rowData)"></Button>
      </template>
    </Column>
  </DataTable>
  <!-- Esqueleto insumos posibles -->
  <DataTable :value="insumosPosible" tableStyle="min-width: 50rem" v-else>
    <Column field="codigo" header="Codigo">

      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column field="subpartida" header="Subpartida">

      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column field="complementario" header="Complementario">

      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column field="suplementario" header="Suplementario">

      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column field="tipoUnidad" header="Tipo Unidad">

      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column field="descripcion" header="Merma">

      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column field="descripcion" header="Descripcion">

      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column header="Accion">

      <template #body="{ value }">
        <Button label="Botón" icon="pi pi-check" @click="handleButtonClick(rowData)"></Button>
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { getInsumos } from "../helpers/insumosEmpresa";
import InsumoInsertar from "./InsumoInsertar.vue";
export default {
  components: {
    InsumoInsertar,
  },
  data() {
    return {
      test:true,
      insumosPosible: new Array(4),
      cargaCompleta: false,
      insumos: null,
      visible: false,
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
  },
  methods: {
    insertado() {
      this.cargarInsumos();
      this.visible = false;

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
  components: { InsumoInsertar }
};
</script>

<style scoped>
span {
  margin-top: 25px;
}
</style>
