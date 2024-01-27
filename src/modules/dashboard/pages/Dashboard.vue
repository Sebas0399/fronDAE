<template lang="">
  <div>

    <Card>
      <template #title> Bienvenido</template>
      <template #content>
        <h1>Creditos Disponibles</h1>

        <h2 class="m-0" vf>
            {{ usuario ? usuario.creditos : 'Cargando...' }}
        </h2>
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
      await getUsuario("1725776650001").then((usu) => {
        this.usuario = usu;
      });
    },
  },
};
</script>
<style lang=""></style>
