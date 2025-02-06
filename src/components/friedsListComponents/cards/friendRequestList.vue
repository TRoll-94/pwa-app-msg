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
        <q-item-label caption>
          <div class="row">
            <c-btn @click="() => friendActions.confirmFriend(req)" :label="$t('confirm')" class="q-mr-xs" size="xs"/>
            <c-btn @click="() => friendRequests.rejectFriendRequest(req)" :label="$t('reject')" size="xs"/>
          </div>
        </q-item-label>
      </q-item-section>
    </template>
    <template v-else>
      <q-item-section>
        <q-item-label>{{ $t('friendRequest.newTo', {name: req.to}) }}</q-item-label>
        <q-item-label caption>
          <div class="row">
            <c-btn @click="() => friendRequests.deleteFriendRequestByEmail(req.to)" :label="$t('delete')" size="xs"/>
          </div>
        </q-item-label>
      </q-item-section>
    </template>
  </q-item>
</q-list>
</template>

<style scoped>

</style>
