<template lang="">
    <div>
        {{usuario}}
    </div>
</template>
<script>
import { getUsuario } from "@/modules/usuario/helpers/getUsuario";
export default {
    mounted() {
        this.obtenerUsuario()
    },
    methods: {
        async obtenerUsuario(){
            await getUsuario("1725776650001").then((x)=>{
            this.usuario=x;
            })
        }
    },
    data() {
        return {
            usuario:null
        }
    },
}
</script>
<style lang="">
    
</style>