import {useCurrentUser} from "vuefire";
import {collection} from "firebase/firestore";
import {db} from "boot/fbBoot";
import {$oConst} from "boot/oConst";
import {normalizeEmail, useUsers} from "src/composables/useUsers";


export function useFriends() {
  const currentUser = useCurrentUser()
  const users = useUsers()
  const friendRequestsRef = collection(db, $oConst.dbNames.FRIENDS)

  const createFriendship = async (friendUser) => {
    const friend = await users.getUserByEmail(friendUser.email)
    await db.collection($oConst.dbNames.FRIENDS).add({
      user: normalizeEmail(currentUser.value.email),
      friend: normalizeEmail(friendUser.email),
      name: friend.name,
      chatBackground: '',
      blocked: false,
    })
    await db.collection($oConst.dbNames.FRIENDS).add({
      user: normalizeEmail(friendUser),
      friend: normalizeEmail(currentUser.value.email),
      name: users.me.value.name,
      chatBackground: '',
      blocked: false,
    })
  }

  const deleteFriendship = async (friendEmail) => {
    const friend = await users.getUserByEmail(friendEmail)
    const friendDoc = await db.collection($oConst.dbNames.FRIENDS).where('user', '==', normalizeEmail(currentUser.value.email)).where('friend', '==', normalizeEmail(friendEmail)).get()
    friendDoc.forEach(async (doc) => {
      await db.collection($oConst.dbNames.FRIENDS).doc(doc.id).delete()
    })
    const userDoc = await db.collection($oConst.dbNames.FRIENDS).where('user', '==', normalizeEmail(friendEmail)).where('friend', '==', normalizeEmail(currentUser.value.email)).get()
    userDoc.forEach(async (doc) => {
      await db.collection($oConst.dbNames.FRIENDS).doc(doc.id).delete()
    })
  }

  const blockFriend = async (friendEmail) => {
    const friendDoc = await db.collection($oConst.dbNames.FRIENDS).where('user', '==', normalizeEmail(currentUser.value.email)).where('friend', '==', normalizeEmail(friendEmail)).get()
    friendDoc.forEach(async (doc) => {
      await db.collection($oConst.dbNames.FRIENDS).doc(doc.id).update({
        blocked: true
      })
    })
  }

  const unblockFriend = async (friendEmail) => {
    const friendDoc = await db.collection($oConst.dbNames.FRIENDS).where('user', '==', normalizeEmail(currentUser.value.email)).where('friend', '==', normalizeEmail(friendEmail)).get()
    friendDoc.forEach(async (doc) => {
      await db.collection($oConst.dbNames.FRIENDS).doc(doc.id).update({
        blocked: false
      })
    })
  }

  return {
    createFriendship,
    deleteFriendship,
  }

}
