<script setup>
import {useCurrentUser} from "vuefire";
import {useRoute, useRouter} from "vue-router";
import {onMounted, watch} from "vue";
import webNotificationDialog from "components/notificationComponents/dialogs/webNotificationDialog.vue";
import {Dialog, useQuasar} from "quasar";
import {useNetworkStatus} from "src/composables/useNetworkStatus";

const user = useCurrentUser()
const router = useRouter()
const route = useRoute()
const $q = useQuasar()
const {isOnline} = useNetworkStatus()

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
    <div class="absolute-top-right z-max" v-if="!isOnline">
      <c-error-box :error="$t('noNetwork')" />
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
