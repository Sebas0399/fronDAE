<template lang="">
  <div>

    <Card>
      <template #title> Bienvenido</template>

      <template #content>
        <h1>Creditos Disponibles</h1>
        

        <h2 class="m-0" v-if="usuario!=null">
           <h3>{{usuario.creditos}}</h3>
        </h2>
        <div v-else>
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
    animationDuration=".9s" aria-label="Custom ProgressSpinner" />
        </div>
        <Button @click="this.$router.push('/pago')">Compra más</Button>
      </template>
    </Card>
  </div>
</template>

<script>
import { getUsuario } from "@/modules/usuario/helpers/getUsuario";
export default {
  data() {
    return {
      usuario: null,
    };
  },
  mounted() {
    this.obtenerUsuario();
  },
  methods: {
    async obtenerUsuario() {
      await getUsuario().then((usu) => {
        this.usuario = usu;
      });
    },
  },
};
</script>

<style lang=""></style>
