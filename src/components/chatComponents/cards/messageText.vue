<script setup>
import {computed} from 'vue'
import LinkPrevue from 'link-prevue'


const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const urlRegex = /(https?:\/\/[^\s]+)/g

const extractedLink = computed(() => {
  const match = props.text.match(urlRegex)
  return match ? match[0] : null
})

const domain = computed(() => {
  if (!extractedLink.value) return ''
  try {
    const urlObj = new URL(extractedLink.value)
    return urlObj.hostname
  } catch (error) {
    return extractedLink.value
  }
})

const linkifiedText = computed(() => {
  if (!extractedLink.value) return props.text
  return props.text.replace(urlRegex, (url) => {
    try {
      const urlObj = new URL(url)
      return `<a href="${url}" target="_blank" rel="noopener">${urlObj.hostname}</a>`
    } catch (e) {
      return url
    }
  })
})
</script>

<template>
  <div>
    <div v-html="linkifiedText"></div>

    <LinkPrevue :url="extractedLink" v-if="extractedLink">
      <template v-slot="props">
        <q-card v-if="props.img" flat class="q-mt-md">
          <q-img :src="props.img" :alt="props.title" height="120px"/>
          <q-card-section>
            <p>{{props.title}}</p>
            <p class="caption">{{props.description}}</p>
            <c-btn v-bind:href="props.url" target="_blank" :label="$t('open')" size="sm"/>
          </q-card-section>
        </q-card>
        <q-card v-else flat class="q-mt-md">
          <q-card-section>
            <p>{{domain}}</p>
          </q-card-section>
        </q-card>
      </template>
    </LinkPrevue>
</div>
</template>

<style scoped></style>
