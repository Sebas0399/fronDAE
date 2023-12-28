<template lang="">
    
    <div>
        
    </div>
</template>
<script>
import {getEmpresas} from  '../helpers/empresasUsuario'

export default {
    data() {
        return {
            
        }
    },
    mounted() {
        const emp= getEmpresas("");
    },

}
</script>
<style lang="">
    
</style>