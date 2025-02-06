<script setup>
import FriendSearchInput from "components/friedsList/inputs/friendSearchInput.vue";
import FriendList from "components/friedsList/cards/friendList.vue";
import FriendRequestList from "components/friedsList/cards/friendRequestList.vue";
import {useFriendRequests} from "src/composables/useFriendRequests";
import AddNewFriendBtn from "components/friedsList/buttons/addNewFriendBtn.vue";
import {computed, ref} from "vue";

const props = defineProps({

})

const {allRequests} = useFriendRequests()

</script>

<template>
<q-card class="full-width full-height">
  <q-card-section>
    <div class="row full-width justify-between items-center no-wrap">
      <friend-search-input class="q-mr-md"/>
      <div>
        <add-new-friend-btn/>
      </div>
    </div>
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
