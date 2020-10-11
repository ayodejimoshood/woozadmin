import axios from 'axios'
import {LOADING_USERS, GET_ALL_USERS} from './types'



export const handleGetUsers = () => async (dispatch, getState) => {
  const state = getState();
  const token = state.auth.user.accessToken;
  const url = 'https://scalable-commerce-backend.herokuapp.com/api/v1/users?pageSize=51&pageNumber=1'
  dispatch({
    type: LOADING_USERS
  })
  try {
    const response = await axios.get(url, {
      headers: {
        'x-access-token': token
      }
    })
    dispatch({
      type: GET_ALL_USERS,
      payload: response.data.users
    })
    return 'done'
  } catch(err) {
    console.log(err)
  }
}