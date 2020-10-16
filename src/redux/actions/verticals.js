import axios from 'axios'
import {LOADING_VERTICALS, GET_VERTICALS} from './types'



export const handleGetVerticals = () => async (dispatch, getState) => {
  const state = getState();
  const token = state.auth.user.accessToken;
  const url = 'https://scalable-commerce-backend.herokuapp.com/api/v1/verticals?pageSize=51&pageNumber=1'
  dispatch({
    type: LOADING_VERTICALS
  })
  try {
    const response = await axios.get(url, {
      headers: {
        'x-access-token': token
      }
    })
    dispatch({
      type: GET_VERTICALS,
      payload: response.data.verticals
    })
    return 'done'
  } catch(err) {
    console.log(err)
  }
}