import { ref, onMounted, onUnmounted } from 'vue';
import { useQuasar } from 'quasar';
import {useI18n} from "vue-i18n";

export function useNetworkStatus() {
  const isOnline = ref(navigator.onLine);
  const $q = useQuasar();
  const {t} = useI18n()

  const updateNetworkStatus = () => {
    isOnline.value = navigator.onLine;
    if (navigator.onLine) {
      $q.notify({
        type: 'positive',
        message: t('networkRestored')
      });
    } else {
      $q.notify({
        type: 'negative',
        message: t('noNetwork')
      });
    }
  };

  onMounted(() => {
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
  });

  onUnmounted(() => {
    window.removeEventListener('online', updateNetworkStatus);
    window.removeEventListener('offline', updateNetworkStatus);
  });

  return { isOnline };
}
