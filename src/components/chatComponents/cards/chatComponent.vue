<script setup>
import { useCollection, useCurrentUser } from "vuefire";
import { useConversation } from "src/composables/useConversation";
import { useRoute } from "vue-router";
import { normalizeEmail } from "src/composables/useUsers";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "boot/fbBoot";
import { useQuasar } from "quasar";
import AvatarComponent from "components/baseComponents/utils/avatarComponent.vue";
import { formatDistance } from "date-fns";
import {useI18n} from "vue-i18n";
import MessageText from "components/chatComponents/cards/messageText.vue";

const currentUser = useCurrentUser();
const conversation = useConversation();
const route = useRoute();

let conversationId = null;
let msgCollection = null;
let newMessage = ref('');
const {t} = useI18n();
const $q = useQuasar();
const scrollAreaRef = ref(null);

let messagesQuery = computed(() => {
  if (!currentUser.value || !route.query.email) return null;
  conversationId = conversation.getConversationId(currentUser.value.email, route.query.email);
  msgCollection = collection(db, `conversations/${conversationId}/messages`);
  return query(msgCollection, orderBy('timestamp'));
});

let messages = useCollection(messagesQuery);

const chantBlockMaxHeight = computed(() => {
  return $q.screen.height - 88;
});

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;
  await conversation.sendMessage(newMessage.value, msgCollection);
  newMessage.value = '';
  scrollBottom();
};

const sendGeolocation = async () => {
  if (!navigator.geolocation) {
    $q.notify({
      type: 'negative',
      message: t('conversation.geoNotSupported')
    });
    return;
  }
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    await conversation.sendMessage(`${t("conversation.geo")}: `  + locationUrl, msgCollection);
    scrollBottom();
  }, (error) => {
    $q.notify({
      type: 'negative',
      message: error.message
    });
  });
};

const scrollBottom = () => {
  scrollAreaRef.value.setScrollPosition('vertical', 99999999, 100);
};

watch(messages, (value) => {
  nextTick(() => {
    scrollBottom();
  });
});
</script>

<template>
  <div class="q-pa-md row justify-center full-height">
    <div class="absolute-top">
      <div class="row q-pa-sm">
        <c-btn icon="arrow_back" round outline to="/" size="sm"/>
      </div>
    </div>
    <div class="full-height full-width">
      <template v-if="conversationId">
        <q-scroll-area
          ref="scrollAreaRef"
          :style="{height: chantBlockMaxHeight + 'px'}"
          class="q-pr-md"
        >
          <div class="q-pa-md" v-if="messages.length">
            <q-chat-message
              :name="msg.from"
              v-for="msg in messages"
              :key="msg.id"
              :sent="normalizeEmail(msg?.from) === normalizeEmail(currentUser.email)"
              :stamp="formatDistance(msg.timestamp.toDate(), new Date())"
            >
              <message-text :text="msg.text"/>
              <template #avatar>
                <avatar-component :text="msg.from" class="q-mx-sm" />
              </template>
            </q-chat-message>
          </div>
          <div v-else>
            <div class="absolute-center">
              <p>{{ $t('conversation.noMessages') }}</p>
            </div>
          </div>
        </q-scroll-area>
        <q-space />
        <div class="full-width row items-center no-wrap justify-between q-pt-md">
          <c-input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            :placeholder="$t('conversation.inputMessage') + '...'"
            style="flex: 1;"
          />
          <c-btn
            :label="$t('send')"
            class="q-ml-sm"
            @click="sendMessage"
          />
          <c-btn
            :label="$t('conversation.geo')"
            icon="place"
            class="q-ml-sm"
            @click="sendGeolocation"
          />
        </div>
      </template>
      <template v-else>
        <div class="absolute-center">
          <p>{{ $t('selectAfriend') }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.full-height {
  height: 100vh;
}
</style>
