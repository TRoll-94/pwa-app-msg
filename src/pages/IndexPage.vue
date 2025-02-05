<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    <chat-component/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import ChatComponent from "components/ChatComponent.vue";

export default defineComponent({
  name: 'IndexPage',
  components: {
    ChatComponent,
  }
})
</script>
