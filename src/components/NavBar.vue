<template>
    <div class="card">
      <TabMenu :model="items" v-model:activeIndex="active">
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple :href="href" v-bind="props.action" @click="updateActive(item)">
              <span v-bind="props.icon" />
              <span v-bind="props.label">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action" @click="updateActive(item)">
            <span v-bind="props.icon" />
            <span v-bind="props.label">{{ item.label }}</span>
          </a>
        </template>
      </TabMenu>
    </div>
  </template>

<script>
export default {
    mounted() {
        console.log(this.active)
    },
  methods: {
    updateActive(item) {
      this.active = item.index;
      localStorage.setItem("activeTab", item.index);
      
    },
  },
  data() {
    return {
      active: parseInt(localStorage.getItem("activeTab")) || 0,
      items: [
        {
          label: "Login",
          index:0,
          icon: "pi pi-home",
          command: () => {
            this.$router.push("/login");
          },
        },
        {
          label: "Registro",
          index:1,
          icon: "pi pi-home",
          command: () => {
            this.$router.push("/registro");
          },
        },
        {
          label: "Dashboard",
          index:2,
          icon: "pi pi-home",
          command: () => {
            this.$router.push("/dashboard");
          },
        },
        {
          label: "Empresas",
          icon: "pi pi-chart-line",
          index:3,
          command: () => {
            this.$router.push("/empresa");
          },
        },
        {
          label: "Run",
          icon: "pi pi-list",
          index:4,
          command: () => {
            this.$router.push("/pdf");
          },
        },
        {
          label: "Usuario",
          icon: "pi pi-list",
          index:5,
          command: () => {
            this.$router.push("/usuario");
          },
        },
      ],
    };
  },
};
</script>
