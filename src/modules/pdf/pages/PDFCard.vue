<template lang="">
    
    <div class="card">
       
        <Card>
            <!-- <template #title> </template> -->
            
            <template #content>
                <Image :src="require('@/assets/pdfLogo.png')" alt="Image" width="50" />
                <h1>{{data}}</h1>
                <Button>Procesar</Button>
            </template>
        </Card>
    </div>


</template>
<script>
import { getDataProcesada } from "../helpers/pdfUtil";

export default {
    props:{
        ruta:String
    },
    data() {
        return {
            data:null
        }
    },
    mounted() {
        
        this.procesarData()
    },
    methods: {
        async procesarData(){
            this.data=await getDataProcesada(this.ruta)
        }
    },
}
</script>
<style lang="">
    
</style>