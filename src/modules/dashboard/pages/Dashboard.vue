<template lang="">
  <div>

    <Card>
      <template #title> Bienvenido</template>

<template #content>
        <h1>Creditos Disponibles</h1>
        

        <h2 class="m-0" v-if="usuario!=null">
           <h3>{{usuario.creditos}}</h3>
        </h2>
        <div v-else>
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
    animationDuration=".9s" aria-label="Custom ProgressSpinner" />
        </div>
        <Button @click="this.$router.push('/pago')">Compra más</Button>
      </template>
</Card>

<Card>
  <template #title>Estadisticas</template>

  <template #content>
    <Chart type="bar" :data="chartData" :options="chartOptions" />

        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
    animationDuration=".9s" aria-label="Custom ProgressSpinner" />
     
      </template>
</Card>
</div>
</template>

<script>
import { getUsuario } from "@/modules/usuario/helpers/getUsuario";
export default {
  data() {
    return {
      chartData: null,
      chartOptions: null,
      usuario: null,
    };
  },
  mounted() {
    this.obtenerUsuario();
    this.chartData = this.setChartData();
    this.chartOptions = this.setChartOptions();
  },
  methods: {
    setChartData() {
      return {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Compensaciones',
            data: [540, 325, 702, 620],
            backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246, 0.2)'],
            borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
            borderWidth: 1
          }
        ]
      };
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      return {
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          }
        }
      };
    },
    async obtenerUsuario() {
      await getUsuario().then((usu) => {
        this.usuario = usu;
        console.log(usu)
      });
    },
  },
};
</script>

<style lang=""></style>
