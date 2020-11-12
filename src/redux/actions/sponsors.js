import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { toastrOptions } from '../../utils/helpers'
import { CREATE_SPONSOR, GET_SPONSORS, GET_SPONSOR, DELETE_SPONSOR } from './types'


// to handle create a new sponsor
export const handleCreateSponsor = (data) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'post',
    url: `https://apis.woozeee.com/api/v1/sponsors`,
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
      type: CREATE_SPONSOR,
      payload: response.data.data
    })
    toastr.success('', 'Sponsor created successfully', toastrOptions)
    return;
  } catch (error) {
    console.log(error.response);
    if (error.response.data.message === 'sponsor already exists') {
      toastr.error('', `Sponsor already exists`, toastrOptions)
      return;
    }
    toastr.error(`An error occured`, toastrOptions)
    return
  }
}


// function to handle get all sponsors
export const handleGetSponsors = (data) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'get',
    url: `https://apis.woozeee.com/api/v1/sponsors?pageNumber=1&pageSize=10&name=&hashtagName=`,
    headers: {
      'Authorization': accessToken
    },
  }
  try {
    const response = await axios(config)
    console.log(response)
    dispatch({
      type: GET_SPONSORS,
      payload: response.data.data
    })
    return;
  } catch (error) {
    console.log(error.response);
    toastr.error(`An error occured getting the sponsors`, toastrOptions)
    return
  }
}


// to handle delete a sponsor
export const handleDeleteSponsor = (data) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'delete',
    url: `https://apis.woozeee.com/api/v1/sponsors/${data}`,
    headers: {
      'Authorization': accessToken
    },
  }
  try {
    const response = await axios(config)
    console.log(response)
    dispatch({
      type: DELETE_SPONSOR,
    })
    toastr.success('', 'Sponsor deleted successfully', toastrOptions)
    return;
  } catch (error) {
    console.log(error.response);
    toastr.error(`An error occured`, toastrOptions)
    return
  }
}