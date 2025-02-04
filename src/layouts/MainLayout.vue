<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {useCurrentUser} from "vuefire";
import {useRoute, useRouter} from "vue-router";
import {onMounted, watch} from "vue";

const user = useCurrentUser()
const router = useRouter()
const route = useRoute()

watch(user, async (currentUser, previousUser) => {
  if (
    !currentUser &&
    previousUser
  ) {
    return redirect()
  }
})

onMounted(() => {
  redirect()
})

const redirect = () => {
  if (!user && route.meta.requiredAuth) {
    return router.push({ name: 'login' })
  }
  if (user && typeof route.query.redirect === 'string') {
    return router.push(route.query.redirect)
  }
}

</script>
