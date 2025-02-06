<script setup>

import {useFriendRequests} from "src/composables/useFriendRequests";
import {useCurrentUser} from "vuefire";
import {normalizeEmail} from "src/composables/useUsers";
import {useFriendActions} from "src/composables/useFriendActions";

const friendRequests = useFriendRequests()
const currentUser = useCurrentUser()
const friendActions = useFriendActions()


</script>

<template>

<q-list>
  <q-item v-for="req in friendRequests.filteredRequests.value" :key="req.id">
    <template v-if="req.to === normalizeEmail(currentUser.email)">
      <q-item-section>
        <q-item-label>{{ $t('friendRequest.newFrom', {name: req.from}) }}</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-btn @click="() => friendActions.confirmFriend(req)" :label="$t('confirm')" class="q-mr-xs"/>
        <q-btn @click="() => friendRequests.rejectFriendRequest(req)" :label="$t('reject')"/>
      </q-item-section>
    </template>
    <template v-else>
      <q-item-section>
        <q-item-label>{{ $t('friendRequest.newTo', {name: req.to}) }}</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-btn @click="() => friendRequests.deleteFriendRequestByEmail(req.to)" :label="$t('delete')"/>
      </q-item-section>
    </template>
  </q-item>
</q-list>
</template>

<style scoped>

</style>
