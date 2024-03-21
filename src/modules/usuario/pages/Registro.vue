<template>
  <div class="contenedor">
    <div>
      <h1>Registro Nuevo Usuario</h1>
    </div>
    <form @submit="onSubmit">

      <span class="p-float-label mt-2">
        <InputText id="nombres" v-model="nombres" type="text" :class="{ 'p-invalid': errorMessageNombres }"
          aria-describedby="text-error-nombres" />
        <label for="nombres">Nombres</label>
      </span>
      <small class="p-error" id="text-error-nombres">{{
      errorMessageNombres || "&nbsp;"
    }}</small>

      <span class="p-float-label mt-2">
        <InputText id="apellidos" v-model="apellidos" type="text" :class="{ 'p-invalid': errorMessageApellidos }"
          aria-describedby="text-error-apellidos" />
        <label for="apellidos">Apellidos</label>
      </span>
      <small class="p-error" id="text-error-apellidos">{{
      errorMessageApellidos || "&nbsp;"
    }}</small>

      <span class="p-float-label mt-2">
        <InputText id="correo" v-model="correo" type="email" :class="{ 'p-invalid': errorMessageCorreo }"
          aria-describedby="text-error-correo" />
        <label for="correo">Correo</label>
      </span>
      <small class="p-error" id="text-error-correo">{{
      errorMessageCorreo || "&nbsp;"
    }}</small>

      <span class="p-float-label mt-2">
        <InputText id="cedula" v-model="cedula" type="text" :class="{ 'p-invalid': errorMessageCedula }"
          aria-describedby="text-error" />
        <label for="cedula">Cédula o Ruc</label>
      </span>
      <small class="p-error" id="text-error-cedula">{{
      errorMessageCedula || "&nbsp;"
    }}</small>

      <span class="p-float-label mt-2">
        <InputText id="password" v-model="password" type="password" :class="{ 'p-invalid': errorMessagePassword }"
          aria-describedby="text-error" />
        <label for="password">Contraseña</label>
      </span>
      <small class="p-error" id="text-error-pass">{{
      errorMessagePassword || "&nbsp;"
    }}</small>
      <div>
        <Button type="submit" label="Registro" :loading="loading" />
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
import * as yup from 'yup';

export default {
  methods: {},
  setup() {
    const loading = ref(false);
    const { handleSubmit, resetForm } = useForm();
    const validationSchema = yup.object({
      nombres: yup.string().required('Campo Requerido'),
      apellidos: yup.string().required('Campo Requerido'),
      correo: yup.string().email('Correo electrónico inválido').required('Campo Requerido'),
      cedula: yup.string().required('Campo Requerido').min(10,"Cédula no válida"), 
      password: yup.string().required('Campo Requerido').min(8, 'La contraseña debe tener al menos 8 caracteres'),
    });
    const { value: nombres, errorMessage: errorMessageNombres } = useField(
      "nombres",
      validationSchema.fields.nombres
    );
    const { value: apellidos, errorMessage: errorMessageApellidos } = useField(
      "apellidos",
      validationSchema.fields.apellidos
    );
    const { value: correo, errorMessage: errorMessageCorreo } = useField(
      "correo",
      validationSchema.fields.correo
    );
    const { value: cedula, errorMessage: errorMessageCedula } = useField(
      "cedula",
      validationSchema.fields.cedula 
    );
    const { value: password, errorMessage: errorMessagePassword } = useField(
      "password",
      validationSchema.fields.password
    );
    const toast = useToast();


    const onSubmit = handleSubmit(async (values) => {
      loading.value = true;

      try {
        // Validate all fields using Yup's validate method
        await validationSchema.validate(values, { abortEarly: false });

        const usuario = {
          apellidos: values.apellidos,
          cedula: values.cedula,
          nombres: values.nombres,
          password: values.password,
          correo: values.correo,
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
              summary: "No se pudo completar el registro",
              life: 3000,
            });
            loading.value = false;
          });
      } catch (error) {
        const errors = {};
        if (error.inner) {
          error.inner.forEach((err) => {
            errors[err.path] = err.message;
          });
        }

        errorMessageNombres.value = errors.nombres || '';
        errorMessageApellidos.value = errors.apellidos || '';
        errorMessageCorreo.value = errors.correo || '';
        errorMessageCedula.value = errors.cedula || '';
        errorMessagePassword.value = errors.password || '';

        loading.value = false;
      }
    });

    return {
      loading,
      nombres,
      apellidos,
      correo,
      cedula,
      password,
      handleSubmit,
      onSubmit,
      errorMessageNombres,
      errorMessageApellidos,
      errorMessageCorreo,
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
