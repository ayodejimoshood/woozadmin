import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { toastrOptions } from '../../utils/helpers'
import { CREATE_CHALLENGE, GET_CHALLENGES, GET_CHALLENGE, DELETE_CHALLENGE, EDIT_CHALLENGE } from './types'


// to handle create a new challenge
export const handleCreateChallenge = (body) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'post',
    url: `https://apis.woozeee.com/api/v1/challenges`,
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
      type: CREATE_CHALLENGE,
      payload: response.data.data
    })
    toastr.success('', 'Challenge created successfully', toastrOptions)
    return 'success';
  } catch (error) {
    console.log(error.response);
    if (error.response.data.message === 'challange already exists') {
      toastr.error('', `Challenge already exists`, toastrOptions)
      return;
    }
    toastr.error(`${error.response.data.message}`, toastrOptions)
    return
  }
}


// function to handle get all challenges
export const handleGetChallenges = (pageNumber) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'get',
    url: `https://apis.woozeee.com/api/v1/challenges?pageNumber=${pageNumber}&pageSize=10&name=&hashtag=&sponsorName=&hasEnded=&sortBy=totalEntries&sortOrder=0`,
    headers: {
      'Authorization': accessToken
    },
  }
  try {
    const response = await axios(config)
    console.log(response)
    dispatch({
      type: GET_CHALLENGES,
      payload: response.data.data
    })
    return {
      message: 'success',
      total: response.data.total
    }
  } catch (error) {
    console.log(error.response);
    toastr.error(`An error occured getting the challenges`, toastrOptions)
    return
  }
}


// to handle delete a challenge
export const handleDeleteChallenge = (data) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'delete',
    url: `https://apis.woozeee.com/api/v1/challenges/${data}`,
    headers: {
      'Authorization': accessToken,
      'Content-Type': 'application/json',
    },
  }
  try {
    const response = await axios(config)
    console.log(data)
    dispatch({
      type: DELETE_CHALLENGE,
      payload: data
    })
    toastr.success('', 'Challenge deleted successfully', toastrOptions)
    return;
  } catch (error) {
    console.log(error.response);
    toastr.error(`An error occured in deleting challenge`, toastrOptions)
    return
  }
}


export const handleEditChallenge = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.token;
  const config = {
    method: 'put',
    url: `https://apis.woozeee.com/api/v1/challenges/${id}`,
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
      type: EDIT_CHALLENGE,
      payload: response.data.data
    })
    toastr.success('', 'Challenge edited successfully', toastrOptions)
    return 'success';
  } catch (error) {
    console.log(error.response);
    toastr.error(`An error occured editing the challenge`, toastrOptions)
    return
  }
}
