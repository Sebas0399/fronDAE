<template>
  <div class="contenedor">
    <div>
      <h1>Iniciar Sesión</h1>
    </div>
    <form @submit="onSubmit">
      <span class="p-float-label">
        <InputText
          id="cedula"
          v-model="cedula"
          type="text"
          :class="{ 'p-invalid': errorMessageCedula }"
          aria-describedby="text-error"
        />
        <label for="nombres">Cédula o RUC</label>
      </span>
      <small class="p-error" id="text-error">{{
        errorMessageCedula || "&nbsp;"
      }}</small>

      <span class="p-float-label">
        <InputText
          id="password"
          v-model="password"
          type="password"
          :class="{ 'p-invalid': errorMessagePassword }"
          aria-describedby="text-error"
        />
        <label for="password">Contraseña</label>
      </span>
      <small class="p-error" id="text-error-pass">{{
        errorMessagePassword || "&nbsp;"
      }}</small>
      <div>
        <Button type="submit" label="Login" :loading="loading" />
      </div>
    </form>
    <Toast />
  </div>
</template>

<script>
import { useToast } from "primevue/usetoast";
import { useField, useForm } from "vee-validate";
import { autenticarUsuario } from "../helpers/auth.js";
import { ref } from "vue";
import store from "@/store";
import router from "@/router";

export default {
  methods: {},
  setup() {
    const loading = ref(false);
    const { handleSubmit, resetForm } = useForm();

    const { value: cedula, errorMessage: errorMessageCedula } = useField(
      "cedula",
      validateField
    );
    const { value: password, errorMessage: errorMessagePassword } = useField(
      "password",
      validateField
    );
    const toast = useToast();
    function validateField(nombres) {
      if (!nombres) {
        return "Campo Requerido";
      }

      return true;
    }

    const onSubmit = handleSubmit((values) => {
      loading.value = true;
      if (
        values.cedula &&
        values.cedula.length > 0 &&
        values.password &&
        values.password.length > 7
      ) {
        const usuario = {
          userName: values.cedula,
          password: values.password,
        };
        autenticarUsuario(usuario)
          .then((x) => {
            toast.add({
              severity: "info",
              summary: "Login Exitoso",

              life: 3000,
            });

            try {
              localStorage.setItem("token", x.jwt);
              localStorage.setItem("isLoggedIn", true);
              //store.commit('setToken',x.jwt);
              //store.commit('setToken',x.jwt);

              //state.isLoggedIn = true;
              //console.log(store.state.token)
              window.location.reload()
              router.push("/dashboard");
            } catch (error) {
              console.log(error);
            }

            loading.value = false;
            resetForm();
          })
          .catch((error) => {
            toast.add({
              severity: "error",
              summary: "Ay no",
              detail: error,

              life: 3000,
            });
            loading.value = false;
          });
      }
    });

    return {
      loading,

      cedula,
      password,
      handleSubmit,
      onSubmit,

      errorMessageCedula,
      errorMessagePassword,
    };
  },
};
</script>
<style scoped>
.contenedor {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
button {
  margin-top: 10px;
}
input {
  margin-top: 10px;
}
</style>
