<template lang="">
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
    <div class="p-fluid ">
      <span class="p-float-label">
        <Checkbox v-model="calculaMerma" :binary="true" inputId="merma" value="Merma" />
        <label for="merma" class="ml-2"> Merma </label>
      </span>
    </div>
    <div class="p-fluid">
        <span class="p-float-label">
         
          <Button
            label="Actualizar"
            icon="pi pi-external-link"
            @click="actualizarInsumo"
          />
        </span>
      </div>
    </div>
</template>

<script>
import { updateInsumo } from "../helpers/actualizarInsumo";

export default {
    data() {
        return {
            calculaMerma:this.insumo.calculaMerma
        }
    },
    mounted() {
    },
    methods: {
        async actualizarInsumo() {
            this.insumo.calculaMerma=this.calculaMerma
            await updateInsumo(this.insumo).then((data) => {
              console.log(data)
                this.$toast.add({
                    severity: "success",
                    summary: "Success Message",
                    detail: "Insumo Actualizado",
                    life: 3000,
                });
                this.$emit("insumoActualizar")
            }).catch((error) => {
              console.log(error)
                this.$toast.add({
                    severity: "error",
                    summary: "No se actualizo correctamente",
                    detail: error,
                    life: 3000,
                });
            });
        },
    },
    props: {
        insumo: {
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