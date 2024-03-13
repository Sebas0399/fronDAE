<template>
    <div class="body">
        <ScrollPanel style="width: 100%; height: 100%">

            <div class="image-container">
                <Image :src="require('@/assets/exportacionBanner.jpeg')" imageClass="w-full mt-1" />
                <div class="text-overlay">
                    <h1>¿Como funciona?</h1>
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
                <div class="col">


                    <h3>Te explicamos paso a paso cómo empezar a usar Facturero Móvil</h3>
                    <h3>Paso 1: Regístrate</h3>
                    <p class="text-left	"> Ingresa tu información como, Nombres, Cedula y
                        correo
                        <router-link to="/registro" target="_blank" rel="noopener">
                            AQUI
                        </router-link>
                        <br>

                    </p>
                    <h3>Paso 2: Haz tu primera recarga</h3>
                    <p class="text-left	">Elige el paquete que más se adapte a tus necesidades, disponemos paquetes desde $10 para uso
                        personal
                        y
                        paquetes especiales para emprendedores o negocios.</p>
                    <h3>Paso 3:</h3>
                    <p class="text-left	">Ingresa tu empresa, y rellena los insumos correspondientes.</p> <br>
                    <p class="text-left	">¡Olvida los papeleos!<br> Anexos Aduana, tu herramienta
                        aduanera
                    </p>
                </div>
            </div>
        </ScrollPanel>
    </div>
    <div class="beneficios"></div>
    <div class="footer">
        <p>Copyright © 2024. <a href="http://www.virtualcreate.net" target="_blank">Virtual Create Cia. Ltda.</a> Todos
            los
            derechos reservados.</p>
    </div>



</template>

<script>

export default {
    components: {

    },

    data() {
        return {
            products: [
                {
                    id: '1000',
                    code: 'f230fh0g3',
                    name: 'Bamboo Watch',
                    description: 'Product Description',
                    image: 'bamboo-watch.jpg',
                    price: 65,
                    category: 'Accessories',
                    quantity: 24,
                    inventoryStatus: 'INSTOCK',
                    rating: 5
                },
            ],
            instrucciones: [
                {
                    id: '1',
                    description: 'Product Description',
                    image: require('@/assets/instrucciones/1.jpg'),
                },
                {
                    id: '2',
                    description: 'Product Description',
                    image: require('@/assets/instrucciones/2.jpg'),
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

.footer {
    background-color: #3F51B5;
    margin-top: auto;
    color: black;
    padding: 5px;
    border-radius: 10px;
}
</style>