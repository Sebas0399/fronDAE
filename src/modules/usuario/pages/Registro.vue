<template>
    <div class="card flex justify-content-center">
        <form @submit="onSubmit" class="flex flex-column gap-2">
            <span class="p-float-label">
                <InputText id="nombres" v-model="nombres" type="text" :class="{ 'p-invalid': errorMessage }" aria-describedby="text-error" />
                <label for="nombres">Name - Surname</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>

            <span class="p-float-label">
                <InputText id="apellidos" v-model="apellidos" type="text" :class="{ 'p-invalid': errorMessageApellidos }" aria-describedby="text-error-apellidos" />
                <label for="apellidos">Name - Surname</label>
            </span>
            <small class="p-error" id="text-error-apellidos">{{ errorMessageApellidos || '&nbsp;' }}</small>

            <Button type="submit" label="Submit" />
        </form>
        <Toast />
    </div>
</template>

<script>
import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';
import {registroUsuario} from '../helpers/registrarUsuario.js'
export default {
    setup() {
        const { handleSubmit, resetForm } = useForm();
        const { value:nombres, errorMessage } = useField('nombres', validateField);
        const { value:apellidos, errorMessageApellidos } = useField('apellidos', validateField);

        const toast = useToast();

        function validateField(nombres) {
            console.log(nombres)
            if (!nombres) {
                return 'CampoRequerido';
            }

            return true;
        }

        const onSubmit = handleSubmit((values) => {
            console.log(values)
            if ((values.nombres && values.nombres.length > 0)&&(values.apellidos && values.apellidos.length > 0)) {
                //registroUsuario()
                toast.add({ severity: 'info', summary: 'Form Submitted', detail: values.nombres, life: 3000 });
                resetForm();
            }
        });

        return { nombres,apellidos, handleSubmit, onSubmit, errorMessage,errorMessageApellidos };
    }
};
</script>
<style scoped>

</style>