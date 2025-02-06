<script setup>

import {useFriends} from "src/composables/useFriends";
import AvatarComponent from "components/baseComponents/utils/avatarComponent.vue";

const friends = useFriends()

</script>

<template>
<q-list>
  <q-item v-for="friend in friends.filterFriends.value" :key="friend.id" clickable>
    <avatar-component :text="friend.name" class="q-mr-sm"/>
    <q-item-section>
      <q-item-label>{{ friend.name }}</q-item-label>
    </q-item-section>
  </q-item>
</q-list>
</template>

<style scoped>

</style>
