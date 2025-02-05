import { boot } from 'quasar/wrappers'

export const $oConst = {}

$oConst.dbNames = {
  USERS: 'users',
  FRIEND_REQUESTS: 'friendRequests',
  FRIENDS: 'friends',
  NOTIFICATIONS: 'notifications',
}

$oConst.friendRequestStatus = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
}

export default boot( (app) => {
  app.config.globalProperties.$oConst = $oConst
})
