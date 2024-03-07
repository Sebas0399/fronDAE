<template>

   <div class="grid grid-nogutter surface-section text-800">
    <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
        <section>
            <span class="block text-6xl font-bold mb-1">Create the screens </span>
            <div class="text-6xl text-primary font-bold mb-3">your visitors deserve to see</div>
            <p class="mt-0 mb-4 text-700 line-height-3">Facilita la creacion de tus anexos compensatorios</p>

            <Button label="Learn More" type="button" class="mr-3" raised></Button>
            <Button label="Live Demo" type="button" outlined></Button>
        </section>
    </div>
    <div class="col-12 md:col-6 overflow-hidden">
        <img :src="require('@/assets/exportacionLogo.jpg')" alt="Image" class="md:ml-auto block md:h-full" style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)">
    </div>
 </div>

</template>

<script>

export default {
  components: {
  }
}
</script>
