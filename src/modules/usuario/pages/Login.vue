<template>
  <div class="contenedor mt-3">
    <div class="text-center mb-5">
      <img :src="require('@/assets/login.png')" alt="Image" height="50" class="mb-3" />
      <div class="text-900 text-3xl font-medium mb-3">Bienvenido</div>
      <span class="text-600 font-medium line-height-3">Aún no tienes cuenta?</span>
      <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
        @click="this.$router.push('/registro')">Registrate ya!</a>
    </div>

    <form @submit="onSubmit">
      <span class="p-float-label">
        <InputText id="cedula" v-model="cedula" type="text" :class="{ 'p-invalid': errorMessageCedula }"
          aria-describedby="text-error" />
        <label for="nombres">Cédula o RUC</label>
      </span>
      <small class="p-error" id="text-error">{{
        errorMessageCedula || "&nbsp;"
      }}</small>

      <span class="p-float-label">
        <InputText id="password" v-model="password" type="password" :class="{ 'p-invalid': errorMessagePassword }"
          aria-describedby="text-error" />
        <label for="password">Contraseña</label>
      </span>
      <small class="p-error" id="text-error-pass">{{
        errorMessagePassword || "&nbsp;"
      }}</small>
      <div>
        <Button type="submit" label="Iniciar sesión" :loading="loading" icon="pi pi-user" class="w-full" />
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
              location.reload()
              router.push("/dashboard");
            } catch (error) {
              console.error(error);
            }

            loading.value = false;
            resetForm();
          })
          .catch((error) => {
            toast.add({
              severity: "error",
              summary: "Error de cédula o contraseña",
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
