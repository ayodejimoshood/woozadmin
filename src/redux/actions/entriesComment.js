import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { toastrOptions } from '../../utils/helpers'
import { CREATE_ENTRYCOMMENT, GET_ENTRIESCOMMENT, GET_ENTRYCOMMENT, DELETE_ENTRYCOMMENT, EDIT_ENTRYCOMMENT } from './types'


// to handle create a new entry
export const handleCreateEntryComment = (body) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'post',
    url: `https://apis.woozeee.com/api/v1/entry-comments`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    },
    data: JSON.stringify(body)
  }
  try {
    const response = await axios(config)
    console.log(response.data.data)
    dispatch({
      type: CREATE_ENTRYCOMMENT,
      payload: response.data.data
    })
    toastr.success('', 'Entry comment created successfully', toastrOptions)
    return 'success';
  } catch (error) {
    console.log(error.response);
    if (error.response.data.message === 'entry comment already exists') {
      toastr.error('', `Entry comment already exists`, toastrOptions)
      return;
    }
    toastr.error(`${error.response.data.message}`, toastrOptions)
    return
  }
}


// function to handle get all entries
export const handleGetEntriesComment = (pageNumber) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'get',
    url: `https://apis.woozeee.com/api/v1/entry-comments?pageNumber=${pageNumber}&pageSize=10`,
    headers: {
      'Authorization': accessToken
    },
  }
  try {
    const response = await axios(config)
    console.log(response)
    dispatch({
      type: GET_ENTRIESCOMMENT,
      payload: response.data.data
    })
    return {
      message: 'success',
      total: response.data.total
    }
  } catch (error) {
    console.log(error.response);
    toastr.error(`An error occured getting the entry comments`, toastrOptions)
    return
  }
}


// to handle delete a entry
export const handleDeleteEntryComment = (data) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'delete',
    url: `https://apis.woozeee.com/api/v1/entry-comments/${data}`,
    headers: {
      'Authorization': accessToken,
      'Content-Type': 'application/json',
    },
  }
  try {
    const response = await axios(config)
    console.log(data)
    dispatch({
      type: DELETE_ENTRYCOMMENT,
      payload: data
    })
    toastr.success('', 'entry comment deleted successfully', toastrOptions)
    return;
  } catch (error) {
    console.log(error.response);
    toastr.error(`An error occured in deleting entry comment`, toastrOptions)
    return
  }
}


export const handleEditEntryComment = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'put',
    url: `https://apis.woozeee.com/api/v1/entry-comments/${id}`,
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
      type: EDIT_ENTRYCOMMENT,
      payload: response.data.data
    })
    toastr.success('', 'Entry comment edited successfully', toastrOptions)
    return 'success';
  } catch (error) {
    console.log(error.response);
    toastr.error(`An error occured editing the entry comment`, toastrOptions)
    return
  }
}
