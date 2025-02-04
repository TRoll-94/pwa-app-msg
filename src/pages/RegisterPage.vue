<script setup>
import RegisterForm from "components/authComponents/forms/RegisterForm.vue";
</script>

<template>
  <q-page>
    <div class="absolute-center text-center">
      <h1 class="text-h4 q-mb-none text-uppercase">{{ $t('projectTitle') }}</h1>
      <h2 class="text-h6 q-mt-sm text-secondary">{{ $t('registerTitle') }}</h2>
      <register-form/>
    </div>
  </q-page>
</template>

<style scoped>

</style>
