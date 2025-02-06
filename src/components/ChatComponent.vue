<script setup>
import {ref} from 'vue'
import {useCollection, useCurrentUser, useDatabaseList} from 'vuefire'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import {db} from "boot/fbBoot";

const currentUser = useCurrentUser()
const otherUserEmail = ref('')

const conversationId = ref(null)
let msgCollection = null
let messages = null

function sanitizeEmail(email) {
  return email.toLowerCase().trim()
}

function getConversationId(email1, email2) {
  const s1 = sanitizeEmail(email1)
  const s2 = sanitizeEmail(email2)
  const l = [s1, s2].sort()
  return l.join(':')
}

function loadConversation() {
  if (!currentUser.value || !otherUserEmail.value) return

  conversationId.value = getConversationId(currentUser.value.email, otherUserEmail.value)
  msgCollection = collection(db, `conversations/${conversationId.value}/messages`)
  messages = useCollection(msgCollection)
}

const newMessage = ref('')

async function sendMessage() {
  if (!newMessage.value.trim()) return
  await addDoc(msgCollection, {
    text: newMessage.value,
    from: currentUser.value.email,
    timestamp: Timestamp.now()
  })
  newMessage.value = ''
}

</script>

<template>
  <div class="chat-container">
    <!-- Если беседа еще не открыта, предлагаем ввести email собеседника -->
    <div v-if="!conversationId" class="open-chat">
      <label for="email">Введите email пользователя для чата:</label>
      <input id="email" v-model="otherUserEmail" placeholder="user@example.com" />
      <button @click="loadConversation">Открыть чат</button>
    </div>

    <!-- Если беседа открыта, показываем заголовок, список сообщений и поле для ввода -->
    <div v-else class="chat-window">
      <h2>Чат с {{ otherUserEmail }}</h2>
      <div class="chat-messages" style="max-height: 400px; overflow-y: auto; border: 1px solid #ccc; padding: 8px;">
        <div
          v-for="msg in messages.sort((a, b) => a.timestamp - b.timestamp)"
          :key="msg['.key']"
          style="margin: 8px 0; padding: 4px; border-radius: 4px;"
          :class="{'my-message': msg.from === currentUser.email, 'other-message': msg.from !== currentUser.email}"
        >
          <strong>{{ msg.from === currentUser.email ? 'Я' : msg.from }}:</strong>
          <span>{{ msg.text }}</span>
        </div>
      </div>
      <div class="chat-input" style="margin-top: 16px;">
        <input
          v-model="newMessage"
          placeholder="Введите сообщение..."
          @keyup.enter="sendMessage"
          style="width: 70%; padding: 8px;"
        />
        <button @click="sendMessage" style="padding: 8px 16px;">Отправить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
}

.open-chat {
  text-align: center;
}

.chat-window h2 {
  text-align: center;
  margin-bottom: 16px;
}

.my-message {
  background-color: #d1ffd1;
  text-align: right;
}

.other-message {
  background-color: #ffd1d1;
  text-align: left;
}
</style>
