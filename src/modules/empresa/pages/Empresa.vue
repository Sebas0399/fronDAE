<template lang="">
  <div class="card flex justify-content-center">
    <Toast />
    <ConfirmPopup group="empresa"></ConfirmPopup>

    <Dialog
      v-model:visible="visible"
      modal
      header="Nueva"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <EmpresaInsertar
      
        @empresaInsertada="insertarNuevaEmpresa"
      ></EmpresaInsertar>
    </Dialog>

    <Dialog
      v-model:visible="visibleActualizar"
      modal
      header="Nueva"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <EmpresaActualizar
        @empresaActualizar="actualizarEmpresa"
        :empresa="empresa"
      ></EmpresaActualizar>
    </Dialog>
  </div>
  <div>
    <!-- tabla de datos -->
    <DataTable
      v-model:filters="filters"
      :globalFilterFields="['ruc']"
      :value="empresas"
      tableStyle="min-width: 50rem"
      v-if="cargaCompleta"
    >
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <InputText v-model="filters['ruc'].value" placeholder="Buscar" />

          <Button
            icon="pi pi-plus"
            @click="this.visible = true"
            
            rounded
            raised
          />
        </div>
      </template>

<template #empty> Empresa no encontrada. </template>

<template #loading> Cargando empresas </template>
<Column field="nombre" header="Nombre"> </Column>
<Column field="ruc" header="Ruc">

  <template #body="{ data }">
          {{ data.ruc }}
        </template>

  <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by name"
          />
        </template>
</Column>
<Column field="direccion" header="Direccion"> </Column>
<Column header="Insumos">

  <template #body="slotProps">
          <Button
            label="Ver"
            icon="pi pi-eye"
            @click="abrirInsumos(slotProps)"
          ></Button>
        </template>
</Column>

<Column header="Accion">

  <template #body="slotProps">
          <span class="p-buttonset">
            <Button
              label="Actualizar"
              icon="pi pi-refresh"
              @click="abrirActualizar(slotProps.data)"
            />
            <Button
              label="Eliminar"
              icon="pi pi-times"
              @click="eliminarEmpresa($event, slotProps.data.id)"
            />
          </span>
        </template>
</Column>
</DataTable>
<!-- tabla de datos por cargar -->

<DataTable :value="empresasPosibles" tableStyle="min-width: 50rem" v-else>
  <Column field="nombre" header="Nombre">

    <template #body>
          <Skeleton></Skeleton>
        </template>
  </Column>
  <Column field="ruc" header="Ruc">

    <template #body>
          <Skeleton></Skeleton>
        </template>
  </Column>
  <Column field="direccion" header="Direccion">

    <template #body>
          <Skeleton></Skeleton>
        </template>
  </Column>
  <Column header="Insumos">

    <template #body>
          <Skeleton></Skeleton>
        </template>
  </Column>
  <Column header="Accion">

    <template #body>
          <Skeleton></Skeleton>
        </template>
  </Column>
</DataTable>
</div>

<Dialog v-model:visible="visibleInsumos" modal header="Insumos" :style="{ width: '50rem' }"
  :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
  <InsumosTodos :ruc="rucInsumo"></InsumosTodos>
</Dialog>
</template>

<script>
import { getEmpresas } from "../helpers/empresasUsuario";
import { deleteEmpresa } from "../helpers/eliminarEmpresa";

import InsumosTodos from "@/modules/insumos/pages/InsumosTodos.vue";
import { FilterMatchMode } from "primevue/api";
import EmpresaInsertar from "./EmpresaInsertar.vue";
import EmpresaActualizar from "./EmpresaActualizar.vue";

export default {
  components: {
    InsumosTodos,
    EmpresaInsertar,
    EmpresaActualizar,
  },
  data() {
    return {
      selectedId: null,
      filters: {
        ruc: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      empresasPosibles: new Array(4),
      cargaCompleta: false,
      visible: false,
      visibleActualizar: false,
      visibleInsumos: false,
      rucInsumo: null,

      empresas: null,

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
    this.obtenerEmpresas();
  },
  methods: {
    insertarNuevaEmpresa() {
      this.obtenerEmpresas();
      this.visible = false;
    },

    actualizarEmpresa() {
      this.obtenerEmpresas();
      this.visibleActualizar = false;
    },
    async obtenerEmpresas() {
      this.cargaCompleta = false;
      getEmpresas()
        .then((emp) => {
          this.cargaCompleta = true;
          this.empresas = emp;
        })
        .catch(() => {
          this.empresas = null;
        });
    },
    abrirActualizar(data) {
      this.visibleActualizar = true;
      this.empresa = {
        id:data.id,
        nombre: data.nombre,
        ruc: data.ruc,
        direccion: data.direccion,
      };
    },

    async eliminarEmpresa(event, val) {
      this.$confirm.require({
        group: "empresa",
        target: event.currentTarget,
        message: "Se va a eliminar la empresa",
        icon: "pi pi-exclamation-triangle",
        accept: async () => {
          const res = await deleteEmpresa(val);
          console.log(res);
          if (res != null) {
            this.$toast.add({
              severity: "success",
              summary: "Success Message",
              detail: "Empresa Eliminada",
              life: 3000,
            });
            this.obtenerEmpresas();
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
    abrirInsumos(val) {
      this.visibleInsumos = true;
      this.rucInsumo = val.data.ruc;
    },
  },
};
</script>

<style scoped>
span {
  margin-top: 25px;
}
</style>
