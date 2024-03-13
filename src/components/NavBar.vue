<template>
  <div>
    <Menubar  :model="items">
      <template #start> </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex align-items-center" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <Badge
            v-if="item.badge"
            :class="{ 'ml-auto': !root, 'ml-2': root }"
            :value="item.badge"
          />
          <span
            v-if="item.shortcut"
            class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1"
            >{{ item.shortcut }}</span
          >
          <i
            v-if="hasSubmenu"
            :class="[
              'pi pi-angle-down',
              { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root },
            ]"
          ></i>
        </a>
      </template>
      <template #end v-if="usuario">
        <div class="flex align-items-center gap-2">
          <Button
            type="button"
            icon="pi pi-user"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
          />
          <Menu
            ref="menu"
            id="overlay_menu"
            :model="itemsUsuario"
            :popup="true"
          />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script>
import * as jose from "jose";
export default {
  computed: {
    isLoggedIn() {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const jwtToken = localStorage.getItem("token");

      if (jwtToken != null) {
        const decodedToken = jose.decodeJwt(jwtToken, { complete: true });

        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    console.log(this.items);
    console.log(this.usuario);

  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    updateActive(item) {
      this.active = item.index;
      localStorage.setItem("activeTab", item.index);
    },
  },
  props: {
    items: {
      type: Array, // or the appropriate type for your items prop
      required: true,
    },
    usuario: {
      type: Boolean, // or the appropriate type for your usuario prop
      default: false,
    },
  },
  data() {
    return {
      isJwtValid: false,
      active: parseInt(localStorage.getItem("activeTab")) || 0,

      itemsUsuario: [
       
        {
          label: "Salir",
          icon: "pi pi-sign-out",
          command: () => {
            localStorage.removeItem("token");
            localStorage.setItem("isLoggedIn", false);
            window.location.reload()

            this.$router.push("/login");
          },
        },
      ],
    };
  },
};
</script>
