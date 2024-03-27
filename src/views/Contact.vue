<template>
    <div class="body">
        <ScrollPanel style="width: 100%; height: 100%">

            <div class="image-container">
                <Image :src="require('@/assets/exportacionBanner.jpeg')" imageClass="w-full mt-1 max-h-30rem" />
                <div class="text-overlay">
                    <h1>Contacto</h1>
                </div>
            </div>
            <div class="grid">

                <div class="col">
                    <div class="p-3 h-full">
                        <div class="shadow-2 p-3 h-full flex flex-column surface-card" style="border-radius: 6px">

                            <div class="flex align-items-center">
                                <span class="font-bold text-2xl text-900">Direccion</span>
                                <!-- <span class="ml-2 font-medium text-600">per month</span> -->
                            </div>
                            <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                            <ul class="list-none p-0 ">
                                <li class="flex align-items-center mb-3">
                                    <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Av. Diego de Almagro y, Pedro Ponce Carrasco, Quito 170135</span>
                                </li>
                                <li class="flex align-items-center mb-3">
                                    <iframe class="h-full w-full mt-10"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.795879408133!2d-78.48474122584872!3d-0.19216829980593791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a7b8ed0e17f%3A0xadf913f8e51e4608!2sINTRASERVICE!5e0!3m2!1ses!2sec!4v1711507628625!5m2!1ses!2sec"
                                        style="border:0;" allowfullscreen="" loading="lazy"
                                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </li>


                            </ul>
                            <div class="flex align-items-center">
                                <span class="font-bold text-2xl text-900">Correo</span>
                                <!-- <span class="ml-2 font-medium text-600">per month</span> -->
                            </div>
                            <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                            <ul class="list-none p-0 ">
                                <li class="flex align-items-center mb-3">
                                    <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>info@intraservice.com.ec</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="p-3 h-full">
                        <div class="shadow-2 p-3 h-full flex flex-column surface-card" style="border-radius: 6px">
                            <div class="flex flex-column gap-2 mb-3">
                                <label for="username">Nombres y Apellidos *</label>
                                <InputText id="username" v-model="valueNombres" placeholder="Obligatorio" />
                            </div>
                            <div class="flex flex-column gap-2 mb-3">
                                <label for="username">Correo Electrónico *</label>
                                <InputText id="username" v-model="valueCorreo" placeholder="Obligatorio" />
                            </div>
                            <div class="flex flex-column gap-2 mb-3">
                                <label for="username">Mensaje *</label>
                                <InputText id="username" v-model="valueMensaje" placeholder="Obligatorio" />
                            </div>
                            <hr class="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
                            <Button label="Iniciar Conversación" class="p-3 w-full mt-auto"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollPanel>
    </div>



</template>

<script>

export default {
    components: {

    },

    data() {
        return {

            instrucciones: [
                {
                    id: '1',
                    description: 'Regístrate',
                    image: require('@/assets/instrucciones/1.jpg'),
                },
                {
                    id: '2',
                    description: 'Haz tu primera recarga',
                    image: require('@/assets/instrucciones/2.jpg'),
                },
                {
                    id: '3',
                    description: 'Sube la información necesaria',
                    image: require('@/assets/instrucciones/3.jpg'),
                },
            ]
        }
    },
}
</script>
<style scoped>
.image-container {
    position: relative;
    /* Enable absolute positioning for text overlay */
}

.text-overlay {
    position: absolute;
    top: 0;
    /* Position the text at the top */
    left: 0;
    /* Position the text at the left */
    width: 100%;
    /* Match the image width */
    height: 100%;
    /* Match the image height (optional, adjust as needed) */
    background-color: rgba(0, 0, 0, 0.5);
    /* Optional background for better readability */
    color: white;
    /* Text color */
    text-align: center;
    /* Center-align the text */
    display: flex;
    /* Allow vertical alignment with flexbox */
    flex-direction: column;
    /* Stack elements vertically */
    justify-content: center;
    /* Vertically center the content */
    align-items: center;
    /* Horizontally center the content */
}

h1,
p {
    margin: 0;
    /* Remove default margins for better layout */
}

.body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}



.enlace-parrafo {
    display: inline-block;
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-decoration: none;
    color: #000;
}
</style>