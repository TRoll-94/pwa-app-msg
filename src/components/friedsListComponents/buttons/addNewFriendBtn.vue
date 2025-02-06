<script setup>

import addNewFriendDialog from "components/friedsListComponents/dialogs/addNewFriendDialog.vue";
import {Dialog} from "quasar";

const clickHandler = () => {
  Dialog.create({
    component: addNewFriendDialog,
  })
}

</script>

<template>
  <c-btn icon="add" round @click="clickHandler"/>
</template>

<style scoped>

</style>
