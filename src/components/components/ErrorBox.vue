<script setup>
const {error} = defineProps({
  error: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <div v-if="error">
    <q-banner class="bg-negative text-white q-mb-sm" rounded>
      <div class="row items-center">
        <div class="col">
          <div>{{ error.message }}</div>
        </div>
      </div>
    </q-banner>
  </div>
</template>

<style scoped>
</style>
