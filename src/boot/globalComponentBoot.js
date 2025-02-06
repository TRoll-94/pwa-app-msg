import { boot } from 'quasar/wrappers'
import baseBtn from "components/baseComponents/buttons/baseBtn.vue";
import baseInput from "components/baseComponents/inputs/baseInput.vue";
import ErrorBox from "components/baseComponents/utils/ErrorBox.vue";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot( ({app}) => {
  const Vue = app
  Vue.component('c-btn', baseBtn)
  Vue.component('c-input', baseInput)
  Vue.component('c-error-box', ErrorBox)
})
