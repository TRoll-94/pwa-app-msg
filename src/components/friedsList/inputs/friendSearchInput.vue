<script setup>

import {useFriendSearchStore} from "stores/example-store";

const friendSearchStore = useFriendSearchStore();


</script>

<template>
  <c-input
    :model-value="friendSearchStore.getSearch"
    @update:model-value="friendSearchStore.setSearch"
    :label="$t('search')"
    clearable
  />
</template>

<style scoped>

</style>
