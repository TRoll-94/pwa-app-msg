<script setup>

import {useFirebaseAuth} from "vuefire";
import {useQuasar} from "quasar";
import {useI18n} from "vue-i18n";

const auth = useFirebaseAuth()
const $q = useQuasar()
const {t} = useI18n()

const logoutHandler = () => {
  auth.signOut()
    .then(() => {
      $q.notify({
        color: 'positive',
        message: t('successfulLogout'),
        timeout: 2000
      })
    })
    .catch((error) => {
      console.error(error)
    })
}

</script>

<template>
  <c-btn
    :label="$t('logout')" @click="logoutHandler"
  />
</template>

<style scoped>

</style>
