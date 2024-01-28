<template>
  <div class="contenedor">
    <div>
      <h1>Registro Nuevo Usuario</h1>
    </div>
    <form @submit="onSubmit">
      <span class="p-float-label">
        <InputText
          id="nombres"
          v-model="nombres"
          type="text"
          :class="{ 'p-invalid': errorMessage }"
          aria-describedby="text-error"
        />
        <label for="nombres">Nombres</label>
      </span>
      <small class="p-error" id="text-error">{{
        errorMessage || "&nbsp;"
      }}</small>

      <span class="p-float-label">
        <InputText
          id="apellidos"
          v-model="apellidos"
          type="text"
          :class="{ 'p-invalid': errorMessageApellidos }"
          aria-describedby="text-error-apellidos"
        />
        <label for="apellidos">Apellidos</label>
      </span>
      <small class="p-error" id="text-error-apellidos">{{
        errorMessageApellidos || "&nbsp;"
      }}</small>

      <span class="p-float-label">
        <InputText
          id="cedula"
          v-model="cedula"
          type="text"
          :class="{ 'p-invalid': errorMessageCedula }"
          aria-describedby="text-error"
        />
        <label for="cedula">Cedula o Ruc</label>
      </span>
      <small class="p-error" id="text-error-cedula">{{
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
        <Button type="submit" label="Submit" :loading="loading" />
      </div>
    </form>
    <Toast />
  </div>
</template>

<script>
import { useToast } from "primevue/usetoast";
import { useField, useForm } from "vee-validate";
import { registroUsuario } from "../helpers/registrarUsuario.js";
import { ref } from "vue";
export default {
  methods: {},
  setup() {
    const loading = ref(false);
    const { handleSubmit, resetForm } = useForm();
    const { value: nombres, errorMessage: errorMessage } = useField(
      "nombres",
      validateField
    );
    const { value: apellidos, errorMessage: errorMessageApellidos } = useField(
      "apellidos",
      validateField
    );
    const { value: cedula, errorMessage: errorMessageCedula } = useField(
      "cedula",
      validateField
    );
    const { value: password, errorMessage: errorMessagePassword } = useField(
      "password",
      validatePassword
    );
    const toast = useToast();
    function validateField(nombres) {
      if (!nombres) {
        return "Campo Requerido";
      }

      return true;
    }
    function validatePassword(password) {
      if (!password) {
        return "Campo Requerido";
      } else if (password.length < 8) {
        return "Longuitud requerida 8 caracteres o más";
      }

      return true;
    }

    const onSubmit = handleSubmit((values) => {
      loading.value = true;
      if (
        values.nombres &&
        values.nombres.length > 0 &&
        values.apellidos &&
        values.apellidos.length > 0 &&
        values.cedula &&
        values.cedula.length > 0 &&
        values.password &&
        values.password.length > 7
      ) {
        const usuario = {
          apellidos: values.apellidos,
          cedula: values.cedula,
          nombres: values.nombres,
          password: values.password,
        };

        registroUsuario(usuario)
          .then((x) => {
            toast.add({
              severity: "info",
              summary: "Registro completado exitosamente",
              life: 3000,
            });
            loading.value = false;
            resetForm();
          })
          .catch((error) => {
            toast.add({
              severity: "error",
              summary: "Usuario ya registrado",
              life: 3000,
            });
            loading.value = false;
          });

        
      }
    });

    return {
      loading,
      nombres,
      apellidos,
      cedula,
      password,
      handleSubmit,
      onSubmit,
      errorMessage,
      errorMessageApellidos,
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
