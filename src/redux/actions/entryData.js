import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { toastrOptions } from '../../utils/helpers'
import { CREATE_ENTRYDATA, GET_ENTRIESDATA, GET_ENTRYDATA, DELETE_ENTRYDATA } from './types'


// to handle create a new entry data
export const handleCreateEntryData = (body) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'post',
    url: `https://apis.woozeee.com/api/v1/entry-data`,
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
      type: CREATE_ENTRYDATA,
      payload: response.data.data
    })
    toastr.success('', 'Entry data created successfully', toastrOptions)
    return 'success';
  } catch (error) {
    console.log(error.response);
    if (error.response.data.message === 'entry data already exists') {
      toastr.error('', `Entry data already exists`, toastrOptions)
      return;
    }
    toastr.error(`${error.response.data.message}`, toastrOptions)
    return
  }
}


// function to handle get all entry datas
export const handleGetEntriesData = () => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'get',
    url: `https://apis.woozeee.com/api/v1/entry-data?pageNumber=1&pageSize=100`,
    headers: {
      'Authorization': accessToken
    },
  }
  try {
    const response = await axios(config)
    console.log(response)
    dispatch({
      type: GET_ENTRIESDATA,
      payload: response.data.data
    })
    return;
  } catch (error) {
    console.log(error.response);
    toastr.error(`An error occured getting the entry data`, toastrOptions)
    return
  }
}


// to handle delete a entry data
export const handleDeleteEntryData = (data) => async (dispatch, getState) => {
  console.log(data)
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'delete',
    url: `https://apis.woozeee.com/api/v1/entry-data`,
    headers: {
      'Authorization': accessToken,
      'Content-Type': 'application/json',
    },
    data: data
  }
  try {
    const response = await axios(config)
    console.log(data)
    dispatch({
      type: DELETE_ENTRYDATA,
      payload: data
    })
    toastr.success('', 'entry data deleted successfully', toastrOptions)
    return;
  } catch (error) {
    console.log(error.response);
    toastr.error(`${error.response.data.message}`, toastrOptions)
    return
  }
}


