<script setup>
import {Notify, useDialogPluginComponent} from 'quasar'
import {ref, watch} from "vue";
import {useFriendRequests} from "src/composables/useFriendRequests";

const props = defineProps({})

defineEmits([
  ...useDialogPluginComponent.emits
])
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const friendEmail = ref('')
const error = ref('')

const {addFriendRequest} = useFriendRequests()

const createFriendship = async () => {
  addFriendRequest(friendEmail.value)
    .then((msg) => {
      Notify.create({
        message: msg,
        color: 'positive',
        position: 'top'
      })
    })
    .catch((err) => {
      error.value = err
    })
    .finally(() => {
      friendEmail.value = ''
    })
}

watch(friendEmail, (value) => {
  if (value.length > 0) {
    error.value = ''
  }
})

</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" flat>
      <q-form @submit="createFriendship">
        <q-card-section class="row justify-between no-wrap">
          <c-input type="email" v-model="friendEmail" class="full-width" :label="$t('email')"/>
          <c-btn :dense="false" :label="$t('save')" class="q-ml-sm" type="submit"/>
        </q-card-section>
        <q-card-section v-show="!!error">
          <c-error-box :error="error" class="text-white"/>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>
