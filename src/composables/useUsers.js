import {useCurrentUser, useDocument} from "vuefire";
import {collection, query, where, or, and, doc, getDoc, setDoc} from "firebase/firestore";import {db} from "boot/fbBoot";
import {$oConst} from "boot/oConst";


export const normalizeEmail = (email) => email?.toLowerCase()?.trim()


export function useUsers() {

  const currentUser = useCurrentUser()
  const usersRef = collection(db, $oConst.dbNames.USERS)

  let me = null
  if (currentUser.value) {
    me = useDocument(doc(usersRef, normalizeEmail(currentUser.value.email)), {once: true}).value
  }

  const getUserByEmail = async (email) => {
    return getDoc(doc(usersRef, normalizeEmail(email)))
  }

  const createUser = async (email, name) => {
    const userDocRef = doc(db, "users", normalizeEmail(email));
    return await setDoc(userDocRef, {
      email: normalizeEmail(email),
      name: name || email,
    });
  }

  return {
    getUserByEmail,
    me,
    createUser,
  }

}
