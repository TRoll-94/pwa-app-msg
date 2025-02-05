<script setup>
import {sendPasswordResetEmail} from "firebase/auth";
import {ref} from "vue";
import {useFirebaseAuth} from "vuefire";
import {useQuasar} from "quasar";
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";

const auth = useFirebaseAuth();
const $q = useQuasar();
const {t} = useI18n();
const router = useRouter();

let email = ref('');
let error = ref(null);

const submitHandler = () => {
  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      $q.notify({
        color: 'positive',
        message: t('resetPasswordInstructionNotify', {email: email.value}),
        timeout: 2000
      })
      router.push({name: 'login'})
    })
    .catch(err => {
      error.value = err
    })
}
</script>

<template>
  <q-form @submit="submitHandler">
    <c-error-box :error="error" />
    <c-input
      :label="$t('email')"
      type="email"
      v-model="email" class="q-mb-sm" autocomplete="username"
    />
    <c-btn
      :label="$t('reset')"
      rounded color="primary" class="full-width" type="submit"
    />
    <div class="column text-secondary text-caption q-mt-md justify-center">
      <div class="flex text-no-wrap no-wrap items-center">
        <div class="q-mr-md">{{ $t('alreadyRegistered') }}</div>
        <c-btn
          :label="$t('login')" flat no-caps text-color="secondary"
          :to="{'name': 'login'}"
        />
      </div>
    </div>
  </q-form>
</template>

<style scoped>

</style>
