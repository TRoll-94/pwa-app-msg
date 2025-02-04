<script setup>
import LoginForm from "components/authComponents/forms/LoginForm.vue";
</script>

<template>
  <q-page>
    <div class="absolute-center text-center">
      <h1 class="text-h4 q-mb-none text-uppercase">{{ $t('projectTitle') }}</h1>
      <h2 class="text-h6 q-mt-sm text-secondary">{{ $t('loginTitle') }}</h2>
      <login-form/>
    </div>
  </q-page>
</template>

<style scoped>

</style>
