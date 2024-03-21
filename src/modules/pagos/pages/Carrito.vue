<template lang="">
    <div class="carrito">
        <h2>Resumen de compra</h2>
        <div class="carrito-grid">
            <h2>Subtotal</h2>
            <h3>{{planes[$route.params.plan-1].precio}}</h3>

            <h2>IVA</h2>
            <h3>{{planes[$route.params.plan-1].precio*0.13}}</h3>
            
            <h2>Precio Final</h2>
            <h3>{{planes[$route.params.plan-1].precio+planes[$route.params.plan-1].precio*0.13}}</h3>

        </div>
        <Button class="text-center" label="Proceder con el pago" @click="pagar()"> </Button>
    </div>
</template>

<script>
import jsonData from "@/modules/pagos/helpers/planes.json"
import { pagarFachada } from '../helpers/pago'
import cedulaServiceInstance from "@/modules/utils/tokenUtils"
export default {
    data() {
        return {
            planes: jsonData,
            precio: null

        }
    },
    mounted() {
    },
    methods: {
        pagar() {
            this.precio = {
                "amount": this.planes[this.$route.params.plan - 1].precio + this.planes[this.$route.params.plan - 1].precio * 0.13,
                "tax": this.planes[this.$route.params.plan - 1].precio * 0.13,
                "amountWithTax": this.planes[this.$route.params.plan - 1].precio,
                "clientTransactionId":cedulaServiceInstance.getCedula()+1,
                "currency": "USD"
            }
            pagarFachada(this.precio).then((res)=>{
                console.log(res)
            })
        }
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