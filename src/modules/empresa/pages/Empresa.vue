<template lang="">
  
  <div class="card flex justify-content-center">
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
      <div>
        <Button
          label="Guardar"
          icon="pi pi-external-link"
          @click="guardarEmpresa"
        />
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
          <Menu :model="items" />
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
          <Button
            type="button"
            icon="pi pi-ellipsis-v"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
          />
          <Menu ref="menu" id="overlay_menu" :model="itemsMenu" :popup="true" />
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
        <template #body="slotProps">
          <Button
            label="Ver"
            icon="pi pi-eye"
            @click="abrirInsumos(slotProps)"
          ></Button>
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog
    v-model:visible="visibleInsumos"
    modal
    header="Header"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <InsumosTodos :ruc="rucInsumo"></InsumosTodos>
  </Dialog>
</template>
<script>
import { getEmpresas } from "../helpers/empresasUsuario";
import { insertEmpresa } from "../helpers/insertarNuevaEmpresa";
import InsumosTodos from "@/modules/insumos/pages/InsumosTodos.vue";
import { FilterMatchMode } from "primevue/api";

export default {
  components: {
    InsumosTodos,
  },
  data() {
    return {
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
          cedula: "1725776650001",
        },
      },
      empresas: null,
      itemsMenu: [
        {
          label: "Actualizar",
          icon: "pi pi-refresh",
        },
        {
          label: "Eliminar",
          icon: "pi pi-times",
        },
      ],

      items: [
        {
          items: [
            {
              label: "Añadir",
              icon: "pi pi-plus",
              command: () => {
                this.visible = true;
              },
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.obtenerEmpresas();
  },
  methods: {
    async guardarEmpresa() {
      await insertEmpresa(this.empresa);
      this.obtenerEmpresas();
    },
    async obtenerEmpresas() {
      getEmpresas("1725776650001").then((emp) => {
        this.cargaCompleta = true;
        this.empresas = emp;
      });
    },
    abrirInsumos(val) {
      console.log(val);
      this.visibleInsumos = true;
      this.rucInsumo = val.data.ruc;
    },
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
  
  },
};
</script>
<style scoped>
span {
  margin-top: 25px;
}
</style>
