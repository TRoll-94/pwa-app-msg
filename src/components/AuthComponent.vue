<template>
  <div>
    <h2>Регистрация</h2>
    <form @submit.prevent="register">
      <input v-model="regEmail" type="email" placeholder="Email" required />
      <input v-model="regPassword" type="password" placeholder="Пароль" required />
      <button type="submit">Зарегистрироваться</button>
    </form>

<!--    <h2>Вход</h2>-->
<!--    <form @submit.prevent="login">-->
<!--      <input v-model="loginEmail" type="email" placeholder="Email" required />-->
<!--      <input v-model="loginPassword" type="password" placeholder="Пароль" required />-->
<!--      <button type="submit">Войти</button>-->
<!--    </form>-->

<!--    <h2>Восстановление пароля</h2>-->
<!--    <form @submit.prevent="resetPassword">-->
<!--      <input v-model="resetEmail" type="email" placeholder="Email для восстановления" required />-->
<!--      <button type="submit">Восстановить пароль</button>-->
<!--    </form>-->

    <div v-if="message" class="message">{{ message }}</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import {useFirebaseAuth} from "vuefire";

export default {
  name: 'AuthComponent',
  data() {
    return {
      regEmail: '',
      regPassword: '',
      loginEmail: '',
      loginPassword: '',
      resetEmail: '',
      error: null,
      message: ''
    }
  },
  methods: {
    async register() {
      const auth = useFirebaseAuth()
      this.error = null
      this.message = ''
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.regEmail, this.regPassword)
        this.message = 'Регистрация успешна: ' + userCredential.user.email
      } catch (err) {
        console.error(err)
        this.error = err.message
      }
    },
    async login() {
      this.error = null
      this.message = ''
      try {
        const userCredential = await signInWithEmailAndPassword(this.$fbAuth, this.loginEmail, this.loginPassword)
        this.message = 'Вход выполнен: ' + userCredential.user.email
      } catch (err) {
        this.error = err.message
      }
    },
    async resetPassword() {
      this.error = null
      this.message = ''
      try {
        await sendPasswordResetEmail(this.$fbAuth, this.resetEmail)
        this.message = 'Инструкция по восстановлению пароля отправлена на ' + this.resetEmail
      } catch (err) {
        this.error = err.message
      }
    }
  }
}
</script>

<style scoped>
.message {
  color: green;
}
.error {
  color: red;
}
</style>
