<script setup>

import {computed, ref} from "vue";

let showPassword = ref(false);

const inputType = computed(() => showPassword.value ? 'text' : 'password');

</script>

<template>
  <q-input
    :label="$t('password')"
    outlined rounded dense
    class="q-mb-sm" autocomplete="current-password"
    :type="inputType"
  >
    <template v-slot:append>
      <q-icon
        :name="showPassword ? 'visibility_off' : 'visibility'"
        @click="showPassword = !showPassword"
      />
    </template>
  </q-input>
</template>

<style scoped>

</style>
