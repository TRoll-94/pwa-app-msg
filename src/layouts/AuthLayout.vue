<script setup>
import {onMounted, watch} from "vue";
import {useCurrentUser} from "vuefire";
import {useRoute, useRouter} from "vue-router";

const user = useCurrentUser()
const router = useRouter()
const route = useRoute()

watch(user, (currentUser, previousUser) => {
  if (
    currentUser &&
    !previousUser &&
    !route.meta.requiredAuth
  ) {
    return redirect()
  }
})

onMounted(() => {
  if (user && !route.meta.requiredAuth) {
    redirect()
  }
})

const redirect = () => {
  if (typeof route.query.redirect === 'string') {
    return router.push(route.query.redirect)
  }
  return router.push({name: 'home'})
}
</script>

<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<style scoped>

</style>
