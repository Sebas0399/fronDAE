<template>
    <div class="body">
        <ScrollPanel style="width: 100%; height: 100%">

            <div class="image-container">
                <Image :src="require('@/assets/precios.jpg')" imageClass="w-full mt-1 max-h-30rem	" />
                <div class="text-overlay">
                    <h1>Precios</h1>
                </div>
            </div>
            <div class="grid">
                <div class="col">
                    <Carousel :value="instrucciones" :numVisible="1" :numScroll="1" orientation="horizontal"
                        verticalViewPortHeight="330px" contentClass="flex align-items-center">
                        <template #item="slotProps">
                            <div class="border-1 surface-border border-round m-2  p-3">
                                <div class="mb-3">
                                    <div class="relative mx-auto">
                                        <img :src="slotProps.data.image" class="w-full border-round" />

                                    </div>
                                </div>
                                <div class="mb-3 font-medium">{{ slotProps.data.description }}</div>
                                <div class="flex justify-content-between align-items-center">
                                    <div class="mt-0 font-semibold text-xl">Paso {{ slotProps.data.id }}</div>

                                </div>
                            </div>
                        </template>
                    </Carousel>
                </div>
                <div class="col text-lg	">
                    <h3>Te explicamos paso a paso cómo empezar a usar Anexos Aduana</h3>
                    <h3>Paso 1: Regístrate</h3>
                    <p class="text-left	"> Ingresa tu información como, Nombres, Cedula y
                        correo
                        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                            @click="this.$router.push('/registro')">AQUI</a>

                        <br>

                    </p>
                    <h3>Paso 2: Haz tu primera recarga</h3>
                    <p class="text-left	">Elige el paquete que más se adapte a tus necesidades, disponemos paquetes
                        desde $10 para uso
                        personal
                        y
                        paquetes especiales para emprendedores o negocios.</p>
                    <h3>Paso 3:</h3>
                    <p class="text-left	">Ingresa tu empresa, y rellena los insumos correspondientes.</p> <br>
                    <h3>Paso 4:</h3>
                    <p class="text-left	">Compensa tus anexos </p> <br>
                    <p class="text-left	">¡Olvida los papeleos!<br> Anexos Aduana, tu herramienta
                        aduanera
                    </p>
                </div>
            </div>
        </ScrollPanel>
    </div>
    <div class="beneficios"></div>



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