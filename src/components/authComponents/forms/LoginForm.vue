<script setup>
import { ref } from 'vue'
import {useFirebaseAuth} from "vuefire";
import {sendPasswordResetEmail, signInWithEmailAndPassword} from "firebase/auth";
import {useI18n} from "vue-i18n";
import {useQuasar} from "quasar";
import {useRouter} from "vue-router";
import PasswordInput from "components/baseComponents/inputs/passwordInput.vue";

let username = ref('');
let password = ref('');
let error = ref(null);

const auth = useFirebaseAuth()
const { t } = useI18n()
const $q = useQuasar()
const router = useRouter()

const submitHandler = () => {
  signInWithEmailAndPassword(auth, username.value, password.value)
    .then(() => {
      $q.notify({
        color: 'positive',
        message: t('successfulLogin'),
        timeout: 2000
      })
      router.push({name: 'home'})
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
      v-model="username" class="q-mb-sm" autocomplete="username"
    />
    <password-input
      :label="$t('password')"
      v-model="password" class="q-mb-sm" autocomplete="current-password"
    />
    <c-btn
      :label="$t('loginButton')"
      rounded color="primary" class="full-width" type="submit"
    />
    <div class="column text-secondary text-caption q-mt-md justify-center">
      <div class="flex text-no-wrap no-wrap items-center">
        <div class="q-mr-md">{{ $t('forgotYourPassword') }}</div>
        <c-btn
          :label="$t('restorePassword')" flat no-caps text-color="secondary"
          :to="{name: 'password.reset'}"
        />
      </div>
      <div class="flex text-no-wrap no-wrap items-center">
        <div class="q-mr-md">{{ $t('dontHaveAccount') }}</div>
        <c-btn
          :label="$t('register')" flat no-caps text-color="secondary"
          :to="{name: 'register'}"
        />
      </div>
    </div>
  </q-form>
</template>

<style scoped>

</style>
