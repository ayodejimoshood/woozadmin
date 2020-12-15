import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { toastrOptions } from '../../utils/helpers'
import { CREATE_HASHTAG, GET_HASHTAGS, GET_HASHTAG, DELETE_HASHTAG, EDIT_HASHTAG } from './types'


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
    dispatch({
      type: CREATE_HASHTAG,
      payload: response.data.data
    })
    toastr.success('', 'Hashtag created successfully', toastrOptions)
    return 'success';
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

export const handleGetHashtags = (pageNumber) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'get',
    url: `https://apis.woozeee.com/api/v1/hashtags?pageNumber=${pageNumber}&pageSize=10&name`,
    headers: {
      'Authorization': accessToken
    },
  }
  try {
    const response = await axios(config)
    dispatch({
      type: GET_HASHTAGS,
      payload: response.data.data
    })
    return {
      message: 'success',
      total: response.data.total
    }
  } catch (error) {
    console.log(error.response);
    toastr.error(`An error occured getting the hashtags`, toastrOptions)
    return
  }
}


// to handle delete an hashtag
export const handleDeleteHashtag = (data) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'delete',
    url: `https://apis.woozeee.com/api/v1/hashtags/${data}`,
    headers: {
      'Authorization': accessToken,
      'Content-Type': 'application/json',
    },
  }
  try {
    const response = await axios(config)
    console.log(data)
    dispatch({
      type: DELETE_HASHTAG,
      payload: data
    })
    toastr.success('', 'Hashtag deleted successfully', toastrOptions)
    return;
  } catch (error) {
    console.log(error.response);
    toastr.error(`An error occured in deleting hashtag`, toastrOptions)
    return
  }
}


export const handleEditHashtag = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'put',
    url: `https://apis.woozeee.com/api/v1/hashtags/${id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    },
    data: JSON.stringify(data)
  }
  try {
    const response = await axios(config)
    console.log(response)
    dispatch({
      type: EDIT_HASHTAG,
      payload: response.data.data
    })
    toastr.success('', 'Hashtag edited successfully', toastrOptions)
    return 'success';
  } catch (error) {
    console.log(error.response);
    toastr.error(`An error occured editing the hashtag`, toastrOptions)
    return
  }
}


