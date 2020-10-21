import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { ADD_CARTEGORY, ADD_HASHTAG, ADD_HASHTAG_ENTRY } from './types'

const toastrOptions = {
  timeOut: 0, 
  showCloseButton: true, 
}

export const handleAddCartegory = (data) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.user.accessToken;
  const config = {
    method: 'post',
    url: 'https://scalable-commerce-backend.herokuapp.com/api/v1/categories',
    headers: {
      "Content-Type": "application/json",
      "x-access-token": accessToken 
    },
    data: JSON.stringify(data)
  }
  try {
    const response = await axios(config)
    const payload = [{...response.data.categories}]
    dispatch({
      type: ADD_CARTEGORY,
      payload
    })
    toastr.success('', `Category ${data.name} has been created successfully`, toastrOptions)
    return 'done';
  } catch (error) {
    console.log(error.response);
    if (error.response.data.message === 'Failed! Interest already exist!') {
      toastr.error(`${data.name} already exists`, toastrOptions)
      return;
    }
    toastr.error('An error occured', toastrOptions)
    return;
  }
}

export const handleAddHashtag = (data) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.user.accessToken;
  const config = {
    method: 'post',
    url: 'https://scalable-commerce-backend.herokuapp.com/api/v1/interests/5f4fc3d1de1327573312e4e4/hashTags',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': accessToken 
    },
    data: JSON.stringify(data)
  }
  try {
    const response = await axios(config)
    console.log(response)
    dispatch({
      type: ADD_HASHTAG,
      payload: response.data
    })
  } catch (error) {
    console.log(error.response);
    if (error.response.data.message === 'Interest does not exists') {
      toastr.error(`Interest does not exist`, toastrOptions)
      return;
    }
    toastr.error(`An error occured`, toastrOptions)
    return
  }
}

export const handleAddHashtagEntry = (data) => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state.auth.user.accessToken;
  const config = {
    method: 'post',
    url: `https://scalable-commerce-backend.herokuapp.com/api/v1/hashtags/5f8c8510d0d7c600178cdbfe/entries`,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': accessToken 
    },
    data: JSON.stringify(data)
  }
  try {
    const response = await axios(config)
    console.log(response)
    dispatch({
      type: ADD_HASHTAG_ENTRY,
      payload: response.data
    })
  } catch (error) {
    console.log(error.response);
    if (error.response.data.message === 'HashTag does not exist') {
      toastr.error('', `HashTag does not exist`, toastrOptions)
      return;
    }
    toastr.error(`An error occured`, toastrOptions)
    return
  }
}