<script setup>
import {ref} from 'vue'
import {useFirebaseAuth} from "vuefire";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {useI18n} from "vue-i18n";
import {useQuasar} from "quasar";
import {useRouter} from "vue-router";
import PasswordInput from "components/baseComponents/inputs/passwordInput.vue";
import {useUsers} from "src/composables/useUsers";

let username = ref('');
let password = ref('');
let error = ref(null);

const auth = useFirebaseAuth()
const {t} = useI18n()
const $q = useQuasar()
const router = useRouter()
const users = useUsers()

const submitHandler = () => {
  createUserWithEmailAndPassword(auth, username.value, password.value)
    .then(() => {
      users.createUser(username.value).then(() => {
        $q.notify({
          color: 'positive',
          message: t('successfulRegistration'),
          timeout: 2000
        })
        router.push({name: 'home'})
      }).catch(err => {
        $q.notify({
          color: 'negative',
          message: err.message,
          timeout: 2000
        })
      })
    }).catch(err => {
    error.value = err.message
  })
}
</script>

<template>
  <q-form @submit="submitHandler">
    <c-error-box :error="error"/>
    <c-input
      :label="$t('email')"
      type="email"
      v-model="username" class="q-mb-sm" autocomplete="username"
    />
    <password-input
      :label="$t('password')"
      v-model="password" class="q-mb-sm" autocomplete="new-password"
    />
    <c-btn
      :label="$t('register')"
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
