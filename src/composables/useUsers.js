import {useCurrentUser, useDocument} from "vuefire";
import {collection, query, where, or, and, doc} from "firebase/firestore";import {db} from "boot/fbBoot";
import {$oConst} from "boot/oConst";


export const normalizeEmail = (email) => email.toLowerCase().trim()


export function useUsers() {

  const currentUser = useCurrentUser()
  const usersRef = collection(db, $oConst.dbNames.USERS)

  const me = useDocument(doc(usersRef, normalizeEmail(currentUser.value.email)), {once: true}).value

  const getUserByEmail = async (email) => {
    return useDocument(doc(usersRef, normalizeEmail(email)), {once: true}).value
  }

  return {
    getUserByEmail,
    me
  }

}
