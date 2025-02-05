import {$oConst} from "boot/oConst";
import { db } from "boot/fbBoot";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useCurrentUser } from "vuefire";

export function useNotifications() {
  const currentUser = useCurrentUser();
  // Collection used to store user notification settings.
  // Every document must have the following fields:
  //   email: string,
  //   fcmToken: string,
  //   notificationsEnabled: bool
  const notificationsRef = collection(db, $oConst.dbNames.NOTIFICATIONS);

  const sendNotification = async (toEmail, title, message) => {
    return;
    try {
      const q = query(notificationsRef, where("email", "==", toEmail));
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
        to: token,
        notification: {
          title: title,
          body: message,
        }
      };

      const serverKey = "YOUR_SERVER_KEY";
      const response = await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "key=" + serverKey,
        },
        body: JSON.stringify(payload),
      });

      const dataResponse = await response.json();
    } catch (error) {
    }
  };

  return {
    sendNotification,
  };
}
