<script setup>
import {useCurrentUser} from "vuefire";
import {useRoute, useRouter} from "vue-router";
import {onMounted, watch} from "vue";
import LogoutBtn from "components/authComponents/buttons/logoutBtn.vue";
import FriendsList from "components/friedsList/cards/friendsListContainer.vue";

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
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <logout-btn/>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
