import axios from 'axios'
import {toastr} from 'react-redux-toastr'
import {LOADING_VERTICALS, GET_VERTICALS, CREATE_VERTICAL} from './types'


const toastrOptions = {
  timeOut: 6000, 
  showCloseButton: true, 
}

export const handleCreateVertical = (vertical) => async (dispatch, getState) => {
  const state = getState()
  const accessToken = state.auth.user.accessToken
  const url = 'https://scalable-commerce-backend.herokuapp.com/api/v1/verticals'
  const config = {
    method: 'post',
    url,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': accessToken
    },
    data : JSON.stringify(vertical)
  }

  try {
    const response = await axios(config)
    console.log(response)
    dispatch({
      type: CREATE_VERTICAL,
      payload: response.data.vertical
    })
    toastr.success('', 'vertical has been created successfully', toastrOptions)
    return 'done'
  } catch (error) {
    console.log(error.response)
    toastr.error('error occured. Check the vertical', toastrOptions)
  }
}

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