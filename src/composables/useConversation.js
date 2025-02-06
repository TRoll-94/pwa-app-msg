import {useCollection, useCurrentUser} from "vuefire";
import {normalizeEmail} from "src/composables/useUsers";
import {addDoc, collection, query, Timestamp, orderBy} from "firebase/firestore";
import {db} from "boot/fbBoot";
import {ref} from "vue";
import {useNotifications} from "src/composables/useNotifications";


export function useConversation() {
  const currentUser = useCurrentUser()

  const notifications = useNotifications();

  function getConversationId(email1, email2) {
    const s1 = normalizeEmail(email1)
    const s2 = normalizeEmail(email2)
    const l = [s1, s2].sort()
    return l.join(':')
  }

  const sendMessage = (newMessage, collection, toEmail) => {
    if (!newMessage.trim()) return
    addDoc(collection, {
      text: newMessage,
      from: currentUser.value.email,
      timestamp: Timestamp.now()
    }).then(() => {
      let title = 'New message from ' + currentUser.value.email
      notifications.sendNotification(toEmail, title, newMessage).then()
    })
  }

  return {
    getConversationId, sendMessage
  }

}
