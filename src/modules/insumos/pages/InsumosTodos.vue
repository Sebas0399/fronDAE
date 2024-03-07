<template>

  <Menu :model="items" />
  <Toast />
  <ConfirmPopup group="insumo"></ConfirmPopup>

  <Dialog v-model:visible="visible" modal header="Nueva" :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <InsumoInsertar @insertado="insertado" :ruc="ruc"></InsumoInsertar>
  </Dialog>

  <Dialog v-model:visible="visibleActualizar" modal header="Actualizar" :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <InsumoActualizar @insumoActualizar="actualizarInsumo" :insumo="insumo"></InsumoActualizar>
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
        <Checkbox :modelValue="slotProps.data.calculaMerma" readonly="true" :binary="true" />
      </template>
    </Column>

    <Column header="Accion">

      <template #body="slotProps">
        <span class="p-buttonset">
          <Button label="Actualizar" icon="pi pi-refresh" @click="abrirActualizar(slotProps.data)" />
          <Button label="Eliminar" icon="pi pi-times" @click="eliminarInsumo($event, slotProps.data.id)" />
        </span>
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
import { deleteInsumo } from "../helpers/eliminarInsumo";

import InsumoInsertar from "./InsumoInsertar.vue";
import InsumoActualizar from "./InsumoActualizar.vue";
export default {
  components: {
    InsumoInsertar, InsumoActualizar
  },
  data() {
    return {
      test: true,
      insumosPosible: new Array(4),
      cargaCompleta: false,
      insumos: null,
      visible: false,
      visibleActualizar: false,
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

    abrirActualizar(data) {
      this.visibleActualizar = true;
      this.insumo = {
        id: data.id,
        codigo: data.codigo,
        subpartida: data.subpartida,
        complementario: data.complementario,
        suplementario: data.suplementario,
        tipoUnidad: data.tipoUnidad,
        descripcion: data.descripcion,
        calculaMerma: data.calculaMerma,


      };
    },
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
    async eliminarInsumo(event, val) {
      this.$confirm.require({
        group: "insumo",
        target: event.currentTarget,
        message: "Se va a eliminar el insumo",
        icon: "pi pi-exclamation-triangle",
        accept: async () => {
          const res = await deleteInsumo(val);
          if (res != null) {
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "Insumo Eliminado",
              life: 3000,
            });
            this.cargarInsumos();
          }
        },
        reject: () => {
          this.$toast.add({
            severity: "error",
            summary: "Cancelado",
            detail: "Eliminacion Cancelada",
            life: 3000,
          });
        },
      });
    },
    actualizarInsumo () {
      this.cargarInsumos();
      this.visibleActualizar = false;
    },

  },

  props: {
    ruc: String,
  },
};
</script>

<style scoped>
span {
  margin-top: 25px;
}
</style>
