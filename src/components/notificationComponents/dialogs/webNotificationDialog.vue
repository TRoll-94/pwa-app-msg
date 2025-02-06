<script setup>
import {Notify, useDialogPluginComponent} from 'quasar'
import {ref} from "vue";
import {useNotifications} from "src/composables/useNotifications";
import {useI18n} from "vue-i18n";
import {$fb} from "boot/fbBoot";

const props = defineProps({})

defineEmits([
  ...useDialogPluginComponent.emits
])
const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent()

let isLoading = ref(false)
let notify = null
const {t} = useI18n();

const notifications = useNotifications()

const enableNotification = () => {
  isLoading.value = true
  Notification.requestPermission()
    .then((perm) => {
      if (perm === 'granted') {
        notify = Notify.create({
          group: false,
          message: t('notification_granted'),
          timeout: 0,
          spinner: true,
        })
        getTokenHandler(true)
      } else if (perm === 'denied') {
        this.$q.notify({
          message: t('notification_denied'),
          type: 'negative',
          textColor: 'white',
        })
        getTokenHandler(false)
      }
    })
    .catch((err) => {
      console.log('Unable to get permission to notify.', err)
    })
    .finally(() => {
      isLoading.value = false
    })
}

const getTokenHandler = (active = true) => {
  if (active) notify({message: t('notification_generating_unique_token')})
  $fb.getToken()
    .then((token) => {
      if (active) notify({message: t('notification_token_saving')})
      notifications.addNotification(token, active)
        .then(() => {
          if (active) notify({
            message: t('notification_token_saved'),
            textColor: 'white',
            timeout: 2000,
            spinner: false,
            type: 'positive',
          })
          onDialogOK()
        })
        .catch(() => {
          if (active) notify({
            message: t('notification_token_error'),
            textColor: 'white',
            timeout: 2000,
            spinner: false,
            type: 'negative',
          })
          onDialogCancel()
        })
    })
    .catch((err) => {
      console.dir(err)
      console.log('Unable to get permission to notify.', err)
      isLoading.value = false
      if (active) notify?.close()
      if (active) this.$q.notify({
        message: t('notification_token_error'),
        type: 'negative',
        textColor: 'white',
      })
      onDialogCancel()
    })
}

</script>

<template>
  <q-dialog persistent ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <p class="text-h5">{{ $t('enable_notifications') }}</p>
        <span> {{ $t('enable_notification_caption') }} </span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          :loading="isLoading"
          icon="notifications" rounded color="primary" :label="$t('enable')" @click="enableNotification"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
