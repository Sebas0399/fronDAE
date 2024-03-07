<template lang="">
    <div class="carrito">
        <h2>Resumen de compra</h2>
        <div class="carrito-grid">
            <h3>{{planes[$route.params.plan-1].precio}}</h3>
        </div>
        <Button class="text-center" label="Proceder con el pago"> </Button>
    </div>
</template>

<script>
import jsonData from "@/modules/pagos/helpers/planes.json"

export default {
    data() {
        return {
            planes:jsonData,
        }
    },
    mounted() {
    },

}
</script>

<style>
.carrito {
    display: flex;
    flex-direction: column;
    justify-content: center;
    
}
</style>