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
            label="Guardar"
            icon="pi pi-external-link"
            @click="guardarEmpresa"
          />
         
        </span>
      </div>
    </div>
</template>

<script>
import { insertEmpresa } from "../helpers/insertarNuevaEmpresa";

export default {
    data() {
        return {
            empresa: {
                nombre: null,
                ruc: null,
                direccion: null,
                usuario: {
                    cedula: null,
                },
            },
        }
    },
    methods: {
        async guardarEmpresa() {
            await insertEmpresa(this.empresa).then((res)=>{
                this.$toast.add({
                    severity: "success",
                    summary: "Success Message",
                    detail: "Empresa Insertada",
                    life: 3000,
                });
                this.clearForm();
                this.$emit("empresaInsertada");

            });
        },
        clearForm() {
            this.empresa = {
                nombre: null,
                ruc: null,
                direccion: null,
                usuario: {
                    cedula: null,
                },
            };
        },
    },
}



</script>

<style scoped>
span {
    margin-top: 25px;
}
</style>