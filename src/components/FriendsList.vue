<script setup>
import { computed } from 'vue'
import { useCurrentUser, useCollection } from 'vuefire'
import { collection, query, where, updateDoc, doc } from 'firebase/firestore'
import { db } from 'boot/fbBoot'

const currentUser = useCurrentUser()
const friendRequestsRef = collection(db, 'friendRequests')

const incomingRequests = useCollection(query(friendRequestsRef, where('to', '==', currentUser.value.email.toLowerCase())))
const outgoingRequests = useCollection(query(friendRequestsRef, where('from', '==', currentUser.value.email.toLowerCase())))

const allRequests = computed(() => {
  return [...incomingRequests.value, ...outgoingRequests.value]
})

const pendingRequests = computed(() =>
  allRequests.value.filter(req => req.status === 'pending')
)

const confirmedFriends = computed(() =>
  allRequests.value.filter(req => req.status === 'confirmed')
)

async function confirmFriend(id) {
  const requestRef = doc(db, 'friendRequests', id)
  await updateDoc(requestRef, {status: 'confirmed'})
}
</script>

<template>
  <div class="friends-list">
    <h2>Список друзей</h2>

    <!-- Блок с запросами, ожидающими подтверждения -->
    <section class="pending">
      <h3>Ожидающие подтверждения</h3>
      <ul>
        <li v-for="req in pendingRequests" :key="req.id">
          <!-- Если текущий пользователь — получатель, даём возможность подтвердить запрос -->
          <template v-if="req.to === currentUser.email">
            Запрос от: <strong>{{ req.from }}</strong>
            <button @click="confirmFriend(req.id)">Подтвердить</button>
          </template>
          <!-- Иначе показываем исходящий запрос -->
          <template v-else>
            Запрос отправлен на: <strong>{{ req.to }}</strong> (ожидает подтверждения)
          </template>
        </li>
      </ul>
    </section>

    <!-- Блок с подтверждёнными друзьями -->
    <section class="confirmed">
      <h3>Друзья</h3>
      <ul>
        <li v-for="req in confirmedFriends" :key="req.id">
          <!-- Определяем, с кем именно дружим -->
          <template v-if="req.from === currentUser.email">
            {{ req.to }}
          </template>
          <template v-else>
            {{ req.from }}
          </template>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.friends-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
}

.friends-list h2,
.friends-list h3 {
  text-align: center;
  margin-bottom: 8px;
}

.friends-list ul {
  list-style: none;
  padding: 0;
}

.friends-list li {
  padding: 8px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.friends-list button {
  margin-left: 10px;
  padding: 4px 8px;
  cursor: pointer;
}
</style>
