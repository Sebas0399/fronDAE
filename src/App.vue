<template>
  <NavBar v-if="isLoggedIn" :items="itemsA"></NavBar>
  <NavBar v-else :items="itemsLogin"></NavBar>
  <Toast group="session"></Toast>

  <router-view></router-view>
  <ConfirmDialog></ConfirmDialog>
  <Footer></Footer>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";

import * as jose from "jose";
import cedulaService from "./modules/utils/tokenUtils";
import { renovarUsuario } from "./modules/usuario/helpers/auth";

export default {
  computed: {
    isLoggedIn() {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn) {
        return JSON.parse(isLoggedIn); // Convert stored string to boolean
      }
      return false;
    },
  },
  watch: {
    tiempoRestante(nuevo, anterior) {
      if (nuevo < 120) {
        this.$confirm.require({
          message: "Su sesión esta por terminar",
          header: "Desea renovar",
          icon: "pi pi-exclamation-triangle",
          rejectClass: "p-button-secondary p-button-outlined",
          rejectLabel: "No",
          acceptLabel: "Si",
          accept: () => {

            //renovar token
            renovarUsuario(cedulaService.getToken()).then((x) => {

              localStorage.setItem("token", x.jwt);
              localStorage.setItem("isLoggedIn", true);
              this.token = jose.decodeJwt(x.jwt, { complete: true });
              this.actualizarTiempoRestante(); // Update timer after successful renewal
              this.iniciarTemporizador();
              this.$toast.add({
                group: "session",
                severity: "info",
                summary: "Confirmado",
                detail: "Sesión Renovada",
                life: 3000,
              });
              location.reload();
              //window.location.reload();

            })
          },
          reject: () => {
            this.$toast.add({
              severity: "error",
              summary: "Rechazado",
              detail: "Se va a cerrrar la sesión",
              life: 3000,
            });

            this.tiempoRestante = null;
            localStorage.removeItem("token");
            localStorage.setItem("isLoggedIn", false);
            this.detenerTemporizador();
            window.location.reload();
          },
        });
      }
    },
  },
  data() {
    return {
      itemsA: [
        {
          label: "Dashboard",
          index: 2,
          icon: "pi pi-home",
          command: () => {
            this.$router.push("/dashboard");
          },
        },

        {
          label: "Empresas",
          icon: "pi pi-chart-line",
          index: 3,
          command: () => {
            this.$router.push("/empresa");
          },
        },
        {
          label: "Compensar",
          icon: "pi pi-list",
          index: 4,
          command: () => {
            this.$router.push("/pdf");
          },
        },


      ],
      itemsLogin: [
        {
          label: "Login",
          index: 0,
          icon: "pi pi-user",
          command: () => {
            this.$router.push("/login");
          },
        },
        {
          label: "Inicio",
          index: 1,
          icon: "pi pi-home",
          command: () => {
            this.$router.push("/");
          },
        },
        {
          label: "Contacto",
          index: 1,
          icon: "pi pi-send",
          command: () => {
            this.$router.push("/contacto");
          },
        },

        {
          label: "Precios",
          index: 1,
          icon: "pi pi-shopping-cart",
          command: () => {
            this.$router.push("/precio");
          },
        },
      ],
      tiempoRestante: null,
      temporizador: null,
      token: null,
    };
  },
  mounted() {
    const tokenString = cedulaService.getToken();

    if (tokenString != null) {
      this.token = jose.decodeJwt(tokenString, { complete: true });
      this.iniciarTemporizador();
    } else {
      console.error("No se encontró el token en el Local Storage.");
    }
  },
  methods: {
    iniciarTemporizador() {
      this.actualizarTiempoRestante();
      this.temporizador = setInterval(() => {
        this.actualizarTiempoRestante();
      }, 1000);
    },
    detenerTemporizador() {
      clearInterval(this.temporizador);
    },
    actualizarTiempoRestante() {
      if (this.token) {
        const ahora = Math.floor(new Date().getTime() / 1000);
        const tiempoRestanteSegundos = this.token.exp - ahora;
        if (tiempoRestanteSegundos <= 0) {
          // El token ha expirado, puedes tomar medidas como cerrar sesión o solicitar un nuevo token
          this.tiempoRestante = "Token expirado";
          localStorage.removeItem("token");

          localStorage.setItem("isLoggedIn", false);
          this.detenerTemporizador();
          window.location.reload();

          this.$router.push("/login");
        } else {
          this.tiempoRestante = tiempoRestanteSegundos;
        }
      } else {
        console.error("El token es nulo o inválido.");
      }
    },
  },
  beforeDestroy() {
    this.detenerTemporizador();
  },
  components: {
    NavBar, Footer
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

body {
  position: relative;
  
  min-height: 100vh;
  padding-bottom: 80px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
