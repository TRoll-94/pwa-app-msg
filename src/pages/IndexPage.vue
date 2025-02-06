<template>
  <q-page>
    <q-splitter
      v-model="splitterModel"
      :limits="[25, 100]"
      class="full-width full-height"
    >

      <template v-slot:before>
        <friends-list-container/>
      </template>
      <template v-slot:after v-if="!$q.platform.is.mobile">
        <friend-request/>
        <chat-component/>
      </template>

    </q-splitter>
  </q-page>
</template>

<script setup>
import {defineComponent, ref} from 'vue'
import ChatComponent from "components/ChatComponent.vue";
import FriendRequest from "components/FriendRequest.vue";
import FriendsListContainer from "components/friedsList/cards/friendsListContainer.vue";
import {useQuasar} from "quasar";

const $q = useQuasar()
const splitterModel = ref(20)

if ($q.platform.is.mobile) {
  splitterModel.value = 100
}

</script>
