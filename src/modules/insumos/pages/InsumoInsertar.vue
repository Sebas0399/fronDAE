<template lang="">
      <Toast />

    <div>
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

        <label for="tipoUnidad">Tipo Unidad</label>
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
        <Checkbox v-model="insumo.calculaMerma" :binary="true" />
        <label for="merma">Merma</label>
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
    </div>
</template>

<script>
import { insertInsumo } from "../helpers/insertInsumo";

export default {
  data() {
    return {
      insumo: {
        codigo: null,
        subpartida: null,
        complementario: null,
        suplementario: null,
        descripcion: null,
        tipoUnidad: null,
        calculaMerma: null,
        empresa: {
          ruc: this.ruc,
        },
      },

    }
  }
  ,
  methods: {
    async guardarInsumo() {
      console.log(this.insumo)
      await insertInsumo(this.insumo).then((z) => {
        //limpiar formulario
        if (z != null) {
          this.$toast.add({
            severity: "success",
            summary: "Success Message",
            detail: "Insumo Insertado",
            life: 3000,
          });
          this.$emit("insertado");
          this.clearForm();

        }
      });
    },
    clearForm() {
      this.insumo = {
        codigo: null,
        subpartida: null,
        complementario: null,
        suplementario: null,
        descripcion: null,
        tipoUnidad: null,
        calculaMerma: null,
        empresa: {
          ruc: this.ruc,
        },
      };
    }
  },
  props: {
    ruc: String,
  },
}
</script>

<style scoped>
span {
  margin-top: 25px;
}
</style>