<template>
  <NavBar v-if="token != null" :items="itemsA" usuario="true"></NavBar>
  <NavBar v-else :items="itemsLogin"></NavBar>
  <router-view></router-view>
  <div>
    <p>Token expirará en: {{ tiempoRestante }}</p>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import * as jose from "jose";

export default {
  
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
          label: "Run",
          icon: "pi pi-list",
          index: 4,
          command: () => {
            this.$router.push("/pdf");
          },
        },

        {
          label: "Usuario",
          icon: "pi pi-list",
          index: 5,
          command: () => {
            this.$router.push("/usuario");
          },
        },
      ],
      itemsLogin: [
        {
          label: "Login",
          index: 0,
          icon: "pi pi-home",
          command: () => {
            this.$router.push("/login");
          },
        },
        {
          label: "Registro",
          index: 1,
          icon: "pi pi-home",
          command: () => {
            this.$router.push("/registro");
          },
        },
      ],
      tiempoRestante: "Calculando tiempo restante...",
      temporizador: null,
      token: null,
    };
  },
  mounted() {
    const tokenString = localStorage.getItem("token");

    if (tokenString != null) {
      // Parsea el token a un objeto si es válido
      this.token = jose.decodeJwt(tokenString, { complete: true });

      // Inicia el temporizador con las marcas de tiempo del token
      this.iniciarTemporizador();
    } else {
      console.error("No se encontró el token en el Local Storage.");
    }
  },
  methods: {
    iniciarTemporizador() {
      this.actualizarTiempoRestante(); // Actualiza el tiempo restante al cargar el componente

      // Configura un temporizador para actualizar el tiempo restante cada segundo
      this.temporizador = setInterval(() => {
        this.actualizarTiempoRestante();
      }, 1000);
    },
    detenerTemporizador() {
      // Detiene el temporizador cuando el componente se destruye o ya no es necesario
      clearInterval(this.temporizador);
    },
    actualizarTiempoRestante() {
      if (this.token) {
        const ahora = Math.floor(new Date().getTime() / 1000); // Marca de tiempo actual en segundos
        const tiempoRestanteSegundos = this.token.exp - ahora;
        if (tiempoRestanteSegundos <= 0) {
          // El token ha expirado, puedes tomar medidas como cerrar sesión o solicitar un nuevo token
          this.tiempoRestante = "Token expirado";
          localStorage.removeItem("token");
          //this.token=null;
          localStorage.setItem("isLoggedIn", false);
          this.detenerTemporizador();
          this.$router.push("/dashboard");
        } else {
          this.tiempoRestante = `${tiempoRestanteSegundos} segundos`;
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
    NavBar,
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
