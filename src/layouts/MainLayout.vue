<script setup>
import {useCurrentUser} from "vuefire";
import {useRoute, useRouter} from "vue-router";
import {onMounted, watch} from "vue";
import webNotificationDialog from "components/notificationComponents/dialogs/webNotificationDialog.vue";
import {Dialog, useQuasar} from "quasar";

const user = useCurrentUser()
const router = useRouter()
const route = useRoute()
const $q = useQuasar()

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
  if (typeof Notification === 'undefined') {
    console.warn('Notification is not supported')
    return null;
  } else if (Notification?.permission === 'denied') {
  } else if (Notification?.permission === 'default') {
    Dialog.create({
      component: webNotificationDialog,
    })
  } else if (Notification?.permission === 'granted') {
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
