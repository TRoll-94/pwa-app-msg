<template>
  <q-page>
    <q-splitter
      v-model="splitterModel"
      :limits="[25, 65]"
      class="full-width full-height"
      :style="{minHeight: $q.screen.height + 'px !important', maxHeight: $q.screen.height + 'px !important'}"
    >

      <template v-slot:before>
        <friends-list-container/>
      </template>
      <template v-slot:after v-if="!$q.platform.is.mobile">
        <chat-component/>
      </template>

    </q-splitter>
  </q-page>
</template>

<script setup>
import {defineComponent, ref} from 'vue'
import FriendsListContainer from "components/friedsListComponents/cards/friendsListContainer.vue";
import {useQuasar} from "quasar";
import ChatComponent from "components/chatComponents/cards/chatComponent.vue";

const $q = useQuasar()
const splitterModel = ref(20)

if ($q.platform.is.mobile) {
  splitterModel.value = 100
}

</script>
