import {
  collection,
  query,
  where,
  or,
  and,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  addDoc,
  Timestamp
} from "firebase/firestore";
import {db} from "boot/fbBoot";
import {$oConst} from "boot/oConst";
import {useCollection, useCurrentUser} from "vuefire";
import {normalizeEmail, useUsers} from "src/composables/useUsers";
import {useI18n} from "vue-i18n";
import {useNotifications} from "src/composables/useNotifications";


export function useFriendRequests() {
  const currentUser = useCurrentUser()
  const friendRequestsRef = collection(db, $oConst.dbNames.FRIEND_REQUESTS)
  const {t} = useI18n()
  const {me} = useUsers()
  const {getUserByEmail} = useUsers()
  const {sendNotification} = useNotifications()

  const allRequestsQuery = query(
    friendRequestsRef,
    and(
      or(
        where('to', '==', normalizeEmail(currentUser.value.email)),
        where('from', '==', normalizeEmail(currentUser.value.email))
      ),
      where('status', '==', $oConst.friendRequestStatus.PENDING)
    )
  )
  const allRequests = useCollection(allRequestsQuery)

  const requestDocRef = (request) => doc(db, $oConst.dbNames.FRIEND_REQUESTS, request.id)

  const addFriendRequest = (friendEmail) => {
    return new Promise(async (resolve, reject) => {
      friendEmail = normalizeEmail(friendEmail)

      if (!friendEmail) {
        return reject(t('friendRequest.errors.emailRequired'))
      }

      if (friendEmail === normalizeEmail(currentUser.value.email)) {
        return reject(t('friendRequest.errors.selfRequest'))
      }

      const existedRequest = await findRequestByEmail(friendEmail)
      if (existedRequest) {
        return reject(t('friendRequest.errors.alreadySent'))
      }

      const friendUser = await getUserByEmail(friendEmail)
      if (!friendUser) {
        return reject(t('friendRequest.errors.userNotFound'))
      }

      try {
        await addDoc(friendRequestsRef, {
          from: currentUser.value.email.toLowerCase(),
          to: friendEmail.value.trim().toLowerCase(),
          status: 'pending',
          createdAt: Timestamp.now()
        })
        sendNotification(
          friendEmail,
          t('friendRequest.send.title'),
          t('friendRequest.send.message', {name: me.name || currentUser.email})
        ).then()
        return resolve(t('friendRequest.created'))
      } catch (error) {
        return reject(error.message)
      }
    })
  }

  const acceptFriendRequest = (request) => {
    return updateDoc(requestDocRef(request), {status: $oConst.friendRequestStatus.ACCEPTED})
  }

  const rejectFriendRequest = (request) => {
    return updateDoc(requestDocRef(request), {status: $oConst.friendRequestStatus.REJECTED})
  }

  const deleteFriendRequestByEmail = async (friendEmail) => {
    const friendRequest = await findRequestByEmail(friendEmail)
    return deleteDoc(requestDocRef(friendRequest))
  }

  const findRequestByEmail = async (friendEmail) => {
    const friendRequestQuery = query(
      friendRequestsRef,
      or(
        and(
          where('from', '==', normalizeEmail(currentUser.value.email)),
          where('to', '==', normalizeEmail(friendEmail))
        ),
        and(
          where('from', '==', normalizeEmail(friendEmail)),
          where('to', '==', normalizeEmail(currentUser.value.email))
        )
      ),
    )

    return new Promise((resolve, reject) => {
      getDocs(friendRequestQuery)
        .then(querySnapshot => {
          let request = null
          querySnapshot.forEach(doc => {
            request = {id: doc.id, ...doc.data()}
          })
          resolve(request)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  return {
    allRequests,
    acceptFriendRequest,
    rejectFriendRequest,
    deleteFriendRequestByEmail,
    findRequestByEmail
  }
}

