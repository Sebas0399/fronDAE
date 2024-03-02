<template lang="">
    <div>
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
            label="Actualizar"
            icon="pi pi-external-link"
            @click="actualizarEmpresa"
          />
        </span>
      </div>
    </div>
</template>

<script>
import { updateEmpresa } from "../helpers/actualizarEmpresa";

export default {
  data() {
    return {

    }
  },
  methods: {
    async actualizarEmpresa() {
      await updateEmpresa(this.empresa).then((data) => {
        this.$toast.add({
          severity: "success",
          summary: "Success Message",
          detail: "Empresa Actualizada",
          life: 3000,
        });
        this.actualizar = false;
        this.visible = false;
      }).catch((error) => {
        this.$toast.add({
          severity: "error",
          summary: "Error Message",
          detail: error,
          life: 3000,
        });
      });
    },
  },
  props: {
    empresa: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>
span {
  margin-top: 25px;
}
</style>