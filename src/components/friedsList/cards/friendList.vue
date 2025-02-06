<script setup>

import {useFriends} from "src/composables/useFriends";

const friends = useFriends()

</script>

<template>
<q-list>
  <q-item v-for="friend in friends.allFriends.value" :key="friend.id">
    <q-item-section>
      <q-item-label>{{ friend.name }}</q-item-label>
    </q-item-section>
  </q-item>
</q-list>
</template>

<style scoped>

</style>
