import {$oConst} from "boot/oConst";
import {db, pVapid} from "boot/fbBoot";
import {collection, query, where, getDocs, doc, setDoc, addDoc} from "firebase/firestore";
import { useCurrentUser } from "vuefire";
import {normalizeEmail} from "src/composables/useUsers";

export function useNotifications() {
  const currentUser = useCurrentUser();
  // Collection used to store user notification settings.
  // Every document must have the following fields:
  //   email: string,
  //   fcmToken: string,
  //   notificationsEnabled: bool
  const notificationsRef = collection(db, $oConst.dbNames.NOTIFICATIONS);

  const addNotification = async (fcmToken, isEnabled) => {
    let email = normalizeEmail(currentUser.value.email);
    let docR = doc(db, $oConst.dbNames.NOTIFICATIONS, fcmToken);
    return await setDoc(docR, {
      email: normalizeEmail(email),
      fcmToken: fcmToken,
      notificationsEnabled: isEnabled,
    });
  }

  const sendNotification = async (toEmail, title, message) => {
    return
    try {
      const q = query(notificationsRef, where("email", "==", normalizeEmail(toEmail)));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return;
      }

      let token = null;
      let enabled = false;
      querySnapshot.forEach(doc => {
        const data = doc.data();
        token = data.fcmToken;
        enabled = data.notificationsEnabled;
      });

      if (!enabled) {
        return;
      }

      if (!token) {
        return;
      }
      const payload = {
        message: {
          token: token,
          notification: {
            title: title,
            body: message,
          },
        }
      };

      const response = await fetch("https://fcm.googleapis.com/v1/projects/todos-e93c9/messages:send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + pVapid,
        },
        body: JSON.stringify(payload),
      });

      const dataResponse = await response.json();
    } catch (error) {
    }
  };

  return {
    sendNotification,
    addNotification,
  };
}
