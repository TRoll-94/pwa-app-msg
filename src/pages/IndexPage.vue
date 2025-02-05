<template>
  <q-page class="flex flex-center">
    <friend-request/>
    <chat-component/>
    <friends-list/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import ChatComponent from "components/ChatComponent.vue";
import FriendRequest from "components/FriendRequest.vue";
import FriendsList from "components/FriendsList.vue";

export default defineComponent({
  name: 'IndexPage',
  components: {
    FriendsList,
    FriendRequest,
    ChatComponent,
  }
})
</script>
