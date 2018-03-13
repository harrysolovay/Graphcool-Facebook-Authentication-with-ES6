import { fromEvent } from 'graphcool-lib'



const getFacebookUser = async (facebookToken) => {
  const response = await fetch(`https://graph.facebook.com/me?fields=id%2Cfriends&access_token=${facebookToken}`)
  return response.json()
}



const getUserId = async (api, facebookId) => {
  const response = await api.request(`
    query {
      User(facebookId: "${facebookId}") {
        id
      }
    }
  `)
  return response.User
    ? response.User.id
    : null
}



const createUser = async (api, facebookUser) => {
  const response = await api.request(`
    mutation {
      createUser(
        facebookId: "${facebookUser.id}"
      ) {
        id
      }
    }
  `)
  return response.createUser.id
}



export default async (event) => {

  if (!event.context.graphcool.pat)
    return { error : 'Authentication not configured correctly.'}

  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')

  const facebookUser = await getFacebookUser(event.data.facebookToken)
  let userId = await getUserId(api, facebookUser.id)
  if(!userId) userId = await createUser(api, facebookUser)
  const authToken = await graphcool.generateAuthToken(userId, 'User')

  return { data : { authToken } }

}
