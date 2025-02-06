<script setup>
import {useCollection, useCurrentUser} from "vuefire";
import {useConversation} from "src/composables/useConversation";
import {useRoute} from "vue-router";
import {normalizeEmail} from "src/composables/useUsers";
import {computed, nextTick, onMounted, ref, shallowRef, watch, watchEffect} from "vue";
import {collection, orderBy, query} from "firebase/firestore";
import {db} from "boot/fbBoot";
import {useQuasar} from "quasar";
import AvatarComponent from "components/baseComponents/utils/avatarComponent.vue";
import {formatDistance} from "date-fns";

const currentUser = useCurrentUser()
const conversation = useConversation()
const route = useRoute()

let conversationId = null
let msgCollection = null
let newMessage = ref('')
let $q = useQuasar()
const scrollAreaRef = ref(null)

let messagesQuery = computed(() => {
  if (!currentUser.value || !route.query.email) return null
  conversationId = conversation.getConversationId(currentUser.value.email, route.query.email)
  msgCollection = collection(db, `conversations/${conversationId}/messages`)
  return query(msgCollection, orderBy('timestamp'))
})

let messages = useCollection(messagesQuery)

const chantBlockMaxHeight = computed(() => {
  return $q.screen.height - 88
})

const sendMessage = async () => {
  await conversation.sendMessage(newMessage.value, msgCollection)
  newMessage.value = ''
  scrollBottom()
}

const scrollBottom = () => {
  scrollAreaRef.value.setScrollPosition('vertical', 99999999, 100)
}

watch(messages, (value) => {
  nextTick(() => {
    scrollBottom()
  })
})
</script>

<template>
  <div class="q-pa-md row justify-center full-height">
    <div class="full-height full-width">
      <template v-if="conversationId">
        <q-scroll-area
          ref="scrollAreaRef"
          :style="{height: chantBlockMaxHeight + 'px'}"
          class="q-pr-md"
        >
          <div class="q-pa-md">
            <q-chat-message
              :name="msg.from"
              v-for="msg in messages"
              :key="msg.id"
              :text="[msg?.text]"
              :sent="normalizeEmail(msg?.from) === normalizeEmail(currentUser.email)"
              :stamp="formatDistance(msg.timestamp.toDate(), new Date())"
            >
              <template #avatar>
                <avatar-component :text="msg.from" class="q-mx-sm"/>
              </template>
            </q-chat-message>
          </div>
        </q-scroll-area>
      </template>
    </div>
    <q-space/>
    <div
      class="full-width row items-center no-wrap justify-between q-pt-md"
    >
      <c-input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        :placeholder="$t('conversation.inputMessage') + '...'"
        style="flex: 1;"
      />
      <c-btn
        :label="$t('send')" class="q-ml-sm"
        @click="sendMessage"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
