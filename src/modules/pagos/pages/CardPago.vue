<template lang="">

      <div class="col-12 lg:col-4">
            <div class="p-3 h-full">
                <div class="shadow-2 p-3 h-full flex flex-column surface-card" style="border-radius: 6px">
                    <div class="text-900 font-medium text-xl mb-2">{{plan.nombre}}</div>
                    <div class="text-600">Plan description</div>
                    <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                    <div class="flex align-items-center">
                        <span class="font-bold text-2xl text-900">${{plan.precio}}</span>
                        <span class="ml-2 font-medium text-600">por mes</span>
                    </div>
                    <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                    <ul class="list-none p-0 m-0 flex-grow-1">
                      
                        <li class="flex align-items-center mb-3" v-for="(detalle,index ) in plan.detalles" :key="index">
                            <i class="pi pi-check-circle text-green-500 mr-2"></i>
                            <span>{{detalle}}</span>
                        </li>
                        
                    </ul>
                    <hr class="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
                    <Button label="Comprar Ahora" class="p-3 w-full mt-auto" @click="pagar()"></Button>
                </div>
            </div>
</div>


</template>


<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    pagar(){
      this.$router.push({ name: 'carrito', params: { plan: this.plan.id } });
    }
  },
 
  props: {
    plan: Object
  }
}

</script>

<style lang="">

</style>