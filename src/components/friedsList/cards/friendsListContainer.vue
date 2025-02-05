<script setup>
import FriendSearchInput from "components/friedsList/inputs/friendSearchInput.vue";
import FriendList from "components/friedsList/cards/friendList.vue";
import FriendRequestList from "components/friedsList/cards/friendRequestList.vue";
import {useFriendRequests} from "src/composables/useFriendRequests";

const props = defineProps({

})

const {allRequests} = useFriendRequests()

</script>

<template>
<q-card>
  <q-card-section>
    <friend-search-input/>
  </q-card-section>
  <q-card-section>
    <div v-if="allRequests.length>0">
      <p>{{ $t('friendRequest.activeFriendshipRequests') }}</p>
      <friend-request-list/>
    </div>
    <div>
      <p>{{ $t('friends') }}</p>
      <friend-list/>
    </div>
  </q-card-section>
</q-card>
</template>

<style scoped>

</style>
