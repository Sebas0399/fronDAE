<template>
    <div class="body">
        <ScrollPanel style="width: 100%; height: 100%">

            <div class="image-container">
                <Image :src="require('@/assets/precios.jpg')" imageClass="w-full mt-1 max-h-30rem	" />
                <div class="text-overlay">
                    <h1>Precios</h1>
                </div>
            </div>

            <div v-for="(plan, id) in planes" :key="id">
                <CardPago :plan="plan"></CardPago>
            </div>

        </ScrollPanel>
    </div>
    <div class="beneficios"></div>



</template>

<script>
import CardPago from "@/modules/pagos/pages/CardPago.vue"
import jsonData from "@/modules/pagos/helpers/planes.json"
export default {
    components: {
        CardPago
    },

    data() {
        return {
            planes: jsonData


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