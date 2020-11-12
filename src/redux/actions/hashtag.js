import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { toastrOptions } from '../../utils/helpers'
import { CREATE_HASHTAG, GET_HASHTAGS, GET_HASHTAG, DELETE_HASHTAG } from './types'


export const handleCreateHashtag = (data) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'post',
    url: `https://apis.woozeee.com/api/v1/hashtags    `,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    },
    data: JSON.stringify(data)
  }
  try {
    const response = await axios(config)
    console.log(response)
    // dispatch({
    //   type: ADD_HASHTAG_ENTRY,
    //   payload: response.data
    // })
    return;
  } catch (error) {
    console.log(error.response);
    if (error.response.data.message === 'hashtag already exists') {
      toastr.error('', `Hashtag already exists`, toastrOptions)
      return;
    }
    toastr.error(`An error occured`, toastrOptions)
    return
  }
}

export const handleGetHashtags = () => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'get',
    url: `https://apis.woozeee.com/api/v1/hashtags?pageNumber=1&pageSize=10&name`,
    headers: {
      'Authorization': accessToken
    },
  }
  try {
    const response = await axios(config)
    console.log(response)
    dispatch({
      type: GET_HASHTAGS,
      payload: response.data.data
    })
    return;
  } catch (error) {
    console.log(error.response);
    toastr.error(`An error occured getting the sponsors`, toastrOptions)
    return
  }
}