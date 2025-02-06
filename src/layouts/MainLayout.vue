<script setup>
import {useCurrentUser} from "vuefire";
import {useRoute, useRouter} from "vue-router";
import {onMounted, watch} from "vue";
import LogoutBtn from "components/authComponents/buttons/logoutBtn.vue";
import FriendsList from "components/friedsListComponents/cards/friendsListContainer.vue";

const user = useCurrentUser()
const router = useRouter()
const route = useRoute()

watch(user, async (currentUser, previousUser) => {
  return redirect()
})

onMounted(() => {
  redirect()
})

const redirect = () => {
  if (!user.value && route.meta.requiredAuth) {
    return router.push({ name: 'login' })
  }
  if (user.value && typeof route.query.redirect === 'string') {
    return router.push(route.query.redirect)
  }
}

</script>


<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
