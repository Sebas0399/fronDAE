<template lang="">
  <div class="card flex justify-content-center">
    <Menu :model="items" />
    <Toast />
    <ConfirmPopup></ConfirmPopup>

    <Dialog
      v-model:visible="visible"
      modal
      header="Nueva"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div class="p-fluid">
        <span class="p-float-label">
          <InputText id="nombre" v-model="empresa.nombre" />
          <label for="nombre">Nombre</label>
        </span>
      </div>
      <div class="p-fluid">
        <span class="p-float-label">
          <InputText id="ruc" v-model="empresa.ruc" />
          <label for="ruc">RUC</label>
        </span>
      </div>
      <div class="p-fluid">
        <span class="p-float-label">
          <InputText id="direccion" v-model="empresa.direccion" />
          <label for="direccion">Direccion</label>
        </span>
      </div>
      <div class="p-fluid">
        <span class="p-float-label">
          <Button
            v-if="!actualizar"
            label="Guardar"
            icon="pi pi-external-link"
            @click="guardarEmpresa"
          />
          <Button
            v-else
            label="Actualizar"
            icon="pi pi-external-link"
            @click="actualizarEmpresa"
          />
        </span>
      </div>
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
        <div class="flex justify-content-end">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['ruc'].value" placeholder="Buscar" />
          </span>
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

  <Dialog
    v-model:visible="visibleInsumos"
    modal
    header="Insumos"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <InsumosTodos :ruc="rucInsumo"></InsumosTodos>
  </Dialog>
</template>
<script>
import { getEmpresas } from "../helpers/empresasUsuario";
import { insertEmpresa } from "../helpers/insertarNuevaEmpresa";
import { deleteEmpresa } from "../helpers/eliminarEmpresa";
import { actualizarEmpresa } from "../helpers/actualizarEmpresa";

import InsumosTodos from "@/modules/insumos/pages/InsumosTodos.vue";
import { FilterMatchMode } from "primevue/api";

export default {
  components: {
    InsumosTodos,
  },
  data() {
    return {
      actualizar: false,
      selectedId: null,
      filters: {
        ruc: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      empresasPosibles: new Array(4),
      cargaCompleta: false,
      visible: false,
      visibleInsumos: false,
      rucInsumo: null,
      empresa: {
        nombre: null,
        ruc: null,
        direccion: null,
        usuario: {
          cedula: null,
        },
      },
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
    async guardarEmpresa() {
      const res = await insertEmpresa(this.empresa);

      if (res != null) {
        this.$toast.add({
          severity: "success",
          summary: "Success Message",
          detail: "Empresa Insertada",
          life: 3000,
        });

        this.clearForm();
        this.obtenerEmpresas();
        this.visible = false;
      }
    },
    async obtenerEmpresas() {
      this.cargaCompleta = false;
      getEmpresas().then((emp) => {
        this.cargaCompleta = true;
        this.empresas = emp;
      }).catch(()=>{
        this.empresas = null;
      });
    },
    async abrirActualizar(data) {
      this.actualizar = true;
      this.visible = true;
      this.empresa = {
        nombre: data.nombre,
        ruc: data.ruc,
        direccion: data.direccion,
      };
      //await actualizarEmpresa(data);
      //this.actualizar=false
      //this.visible=false
    },
    async eliminarEmpresa(event, val) {
      this.$confirm.require({
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
      console.log(val);
      this.visibleInsumos = true;
      this.rucInsumo = val.data.ruc;
    },

    clearForm() {
      this.empresa = {
        nombre: null,
        ruc: null,
        direccion: null,
        usuario: {
          cedula: "1725776650001",
        },
      };
    },
  },
};
</script>
<style scoped>
span {
  margin-top: 25px;
}
</style>
