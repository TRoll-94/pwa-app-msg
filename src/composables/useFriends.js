import {useCollection, useCurrentUser} from "vuefire";
import {addDoc, collection, deleteDoc, doc, query, where} from "firebase/firestore";
import {db} from "boot/fbBoot";
import {$oConst} from "boot/oConst";
import {normalizeEmail, useUsers} from "src/composables/useUsers";


export function useFriends() {
  const currentUser = useCurrentUser()
  const users = useUsers()
  const friendRequestsRef = collection(db, $oConst.dbNames.FRIENDS)

  const allFriendsQuery = query(
    friendRequestsRef,
    where('user', '==', normalizeEmail(currentUser.value.email))
  )
  const allFriends = useCollection(allFriendsQuery)

  const createFriendship = async (friendUser) => {
    const friend = await users.getUserByEmail(friendUser.email)
    await addDoc(friendRequestsRef,{
      user: normalizeEmail(currentUser.value.email),
      friend: normalizeEmail(friendUser.email),
      name: friend?.name || friendUser.email,
      chatBackground: '',
      blocked: false,
    })
    await addDoc(friendRequestsRef,{
      user: normalizeEmail(friendUser.email),
      friend: normalizeEmail(currentUser.value.email),
      name: users.me?.value?.name || currentUser.value.email,
      chatBackground: '',
      blocked: false,
    })
  }

  const objDocRef = (id) => doc(db, $oConst.dbNames.FRIENDS, id)

  const deleteFriendship = async (friendEmail) => {
    const friend = await users.getUserByEmail(friendEmail)
    const friendDoc = useCollection(
      query(
        friendRequestsRef,
        where('user', '==', normalizeEmail(currentUser.value.email)),
        where('friend', '==', normalizeEmail(friendEmail))
      ), {once: true}
    )
    friendDoc.value.forEach(async (doc) => {
      await deleteDoc(objDocRef(doc.id))
    })
    const userDoc = useCollection(
      query(
        friendRequestsRef,
        where('user', '==', normalizeEmail(friendEmail)),
        where('friend', '==', normalizeEmail(currentUser.value.email))
      )
    )
    userDoc.value.forEach(async (doc) => {
      await deleteDoc(objDocRef(doc.id))
    })
  }

  const blockFriend = async (friendEmail, block=true) => {
    const friendDoc = useCollection(
      query(
        friendRequestsRef,
        where('user', '==', normalizeEmail(currentUser.value.email)),
        where('friend', '==', normalizeEmail(friendEmail))
      )
    )
    friendDoc.value.forEach(async (doc) => {
      await docUpdate(objDocRef(doc.id), {
        blocked: block
      })
    })
  }

  const unblockFriend = async (friendEmail) => {
    return blockFriend(friendEmail, false)
  }

  return {
    createFriendship,
    deleteFriendship,
    allFriends,
  }

}
