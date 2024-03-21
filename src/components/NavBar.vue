<template>
  <div>
    <Menubar :model="items">
      <template #start> </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex align-items-center" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
          <span v-if="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{
      item.shortcut }}</span>
          <i v-if="hasSubmenu" :class="[
      'pi pi-angle-down',
      { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root },
    ]"></i>
        </a>
      </template>
      <template #end>
        <div class="flex align-items-center gap-2">
          <Button type="button" icon="pi pi-user" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
          <Menu ref="menu" id="overlay_menu" :model="itemsUsuario" :popup="true" />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script>

export default {
  props: {
    items: {
      type: Array, // or the appropriate type for your items prop
      required: true,
    },
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
  },
  data() {
    return {
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
