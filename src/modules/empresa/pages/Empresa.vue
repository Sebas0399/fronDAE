<template lang="">
  <div class="card flex justify-content-center">
    <Menu :model="items" />
  </div>
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
          label="Show"
          icon="pi pi-external-link"
          @click="guardarEmpresa"
        />
      </div>
    </Dialog>
  </div>
</template>
<script>
import { getEmpresas } from "../helpers/empresasUsuario";
import { insertEmpresa } from "../helpers/insertarNuevaEmpresa";

export default {
  data() {
    return {
      visible: false,
      empresa: {
        nombre: null,
        ruc: null,
        direccion: null,
      },
      items: [
        {
          items: [
            {
              label: "New",
              icon: "pi pi-plus",
              command: () => {
                this.visible=true
              },
            },
            {
              label: "Search",
              icon: "pi pi-search",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    //const emp= getEmpresas();
  },
  methods: {
    guardarEmpresa() {
      insertEmpresa(this.empresa);
    },
  },
};
</script>
<style scoped>
span {
  margin-top: 25px;
}
</style>
