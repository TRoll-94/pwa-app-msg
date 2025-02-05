<script setup>

import ResetPasswordForm from "components/authComponents/forms/ResetPasswordForm.vue";
</script>

<template>
  <q-page>
    <div>
      <div class="absolute-center text-center">
        <h1 class="text-h4 q-mb-none text-uppercase">{{ $t('projectTitle') }}</h1>
        <h2 class="text-h6 q-mt-sm text-secondary">{{ $t('resetPassword') }}</h2>
        <reset-password-form/>
      </div>
    </div>
  </q-page>
</template>

<style scoped>

</style>
