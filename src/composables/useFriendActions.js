import { useCurrentUser } from 'vuefire'
import { normalizeEmail } from 'src/composables/useUsers'
import { useFriendRequests } from 'src/composables/useFriendRequests'
import { useFriends } from 'src/composables/useFriends'

export function useFriendActions() {
  const currentUser = useCurrentUser()
  const { acceptFriendRequest, deleteFriendRequestByEmail } = useFriendRequests()
  const { createFriendship, deleteFriendship } = useFriends()

  const confirmFriend = async (request) => {
    await acceptFriendRequest(request)
    const currentEmail = normalizeEmail(currentUser.value.email)
    const friendEmail = request.from === currentEmail ? request.to : request.from
    await createFriendship({ email: friendEmail })
  }

  const removeFriend = async (friendEmail) => {
    await deleteFriendship(friendEmail)
    await deleteFriendRequestByEmail(friendEmail)
  }

  return {
    confirmFriend,
    removeFriend,
  }
}
