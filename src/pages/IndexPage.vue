<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    <auth-component />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import AuthComponent from "components/AuthComponent.vue";

export default defineComponent({
  name: 'IndexPage',
  components: {
    AuthComponent,
  }
})
</script>
