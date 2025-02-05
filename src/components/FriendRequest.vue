<script setup>
import { ref } from 'vue'
import { useCurrentUser } from 'vuefire'
import { collection, addDoc, Timestamp, query, where, getDocs, or, and } from 'firebase/firestore'
import { db } from 'boot/fbBoot'

const currentUser = useCurrentUser()

const friendEmail = ref('')

const errorMessage = ref('')
const successMessage = ref('')

async function sendFriendRequest() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!friendEmail.value.trim()) {
    errorMessage.value = 'Введите email пользователя для отправки запроса.'
    return
  }

  if (friendEmail.value.trim().toLowerCase() === currentUser.value.email.toLowerCase()) {
    errorMessage.value = 'Нельзя отправить запрос самому себе.'
    return
  }

  const friendRequestsCollection = collection(db, 'friendRequests')

  // Проверяем, существует ли уже запрос от текущего пользователя к указанному email
  const friendRequestQuery = query(
    friendRequestsCollection,
    or(
      and(
        where('from', '==', currentUser.value.email.toLowerCase()),
        where('to', '==', friendEmail.value.trim().toLowerCase())
      ),
      and(
        where('from', '==', friendEmail.value.trim().toLowerCase()),
        where('to', '==', currentUser.value.email.toLowerCase())
      )
    ),
  )

  const querySnapshot = await getDocs(friendRequestQuery)
  if (!querySnapshot.empty) {
    errorMessage.value = 'Запрос уже был отправлен.'
    return
  }

  try {
    await addDoc(friendRequestsCollection, {
      from: currentUser.value.email.toLowerCase(),
      to: friendEmail.value.trim().toLowerCase(),
      status: 'pending',
      createdAt: Timestamp.now()
    })
    successMessage.value = 'Запрос в друзья успешно отправлен.'
    friendEmail.value = ''
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<template>
  <div class="friend-request">
    <h2>Отправить запрос в друзья</h2>
    <div class="input-group">
      <input v-model="friendEmail" placeholder="Email друга" type="email" />
      <button @click="sendFriendRequest">Отправить запрос</button>
    </div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
  </div>
</template>

<style scoped>
.friend-request {
  max-width: 400px;
  margin: 20px auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.friend-request input {
  padding: 8px;
  font-size: 1rem;
}

.friend-request button {
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 8px;
}

.success-message {
  color: green;
  margin-top: 8px;
}
</style>
