import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { toastrOptions } from '../../utils/helpers'
import { CREATE_ENTRY, GET_ENTRIES, GET_ENTRY, DELETE_ENTRY, EDIT_ENTRY } from './types'
import { v4 as uuid } from 'uuid';


// to handle create a new entry
export const handleCreateEntry = (body) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'post',
    url: `https://apis.woozeee.com/api/v1/entries`,
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
      type: CREATE_ENTRY,
      payload: response.data.data
    })
    toastr.success('', 'Entry created successfully', toastrOptions)
    return 'success';
  } catch (error) {
    console.log(error.response);
    if (error.response.data.message === 'entry already exists') {
      toastr.error('', `Entry already exists`, toastrOptions)
      return;
    }
    toastr.error(`${error.response.data.message}`, toastrOptions)
    return
  }
}


// function to handle get all entries
export const handleGetEntries = (data) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'get',
    url: `https://apis.woozeee.com/api/v1/entries?pageNumber=1&pageSize=100&hashtag=&categoryId=&sponsorId=&sponsorName=&sortOrder=1&sortBy=totalComments&challengeName&challengeId`,
    headers: {
      'Authorization': accessToken
    },
  }
  try {
    const response = await axios(config)
    console.log(response)
    dispatch({
      type: GET_ENTRIES,
      payload: response.data.data
    })
    return;
  } catch (error) {
    console.log(error.response);
    toastr.error(`An error occured getting the entries`, toastrOptions)
    return
  }
}


// to handle delete a entry
export const handleDeleteEntry = (data) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'delete',
    url: `https://apis.woozeee.com/api/v1/entries/${data}`,
    headers: {
      'Authorization': accessToken,
      'Content-Type': 'application/json',
    },
  }
  try {
    const response = await axios(config)
    console.log(data)
    dispatch({
      type: DELETE_ENTRY,
      payload: data
    })
    toastr.success('', 'entry deleted successfully', toastrOptions)
    return;
  } catch (error) {
    console.log(error.response);
    toastr.error(`An error occured in deleting entry`, toastrOptions)
    return
  }
}


export const handleEditEntry = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'put',
    url: `https://apis.woozeee.com/api/v1/entries/${id}`,
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
      type: EDIT_ENTRY,
      payload: response.data.data
    })
    toastr.success('', 'Entry edited successfully', toastrOptions)
    return 'success';
  } catch (error) {
    console.log(error.response);
    toastr.error(`An error occured editing the entry`, toastrOptions)
    return
  }
}
