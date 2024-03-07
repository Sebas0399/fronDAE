<template lang="">
    <div v-for="(plan, id) in planes" :key="id">
        <CardPago :plan="plan" ></CardPago>
    </div>
</template>

<script>
import CardPago from "./CardPago.vue"
import jsonData from "@/modules/pagos/helpers/planes.json"
export default {
    data() {
        return {
            planes:jsonData
        }
    },
    mounted(){

    },
    methods: {
        
    },
    components: {
        CardPago
    }
}
</script>

<style lang="">

</style>