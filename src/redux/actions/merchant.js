import axios from 'axios'
import {toastr} from 'react-redux-toastr'
import { CREATE_MERCHANT } from './types'

const toastrOptions = {
  timeOut: 6000, 
  showCloseButton: true, 
}

export const handleCreateMerchant = (merchant) => async (dispatch) => {
  console.log(merchant)
  const url = 'https://scalable-commerce-backend.herokuapp.com/api/v1/merchants'
  const config = {
    method: 'post',
    url,
    headers: {
      'Content-Type': 'application/json'
    },
    data : JSON.stringify(merchant)
  }

  try {
    const response = await axios(config)
    const data = [{...response.data.merchant}]
    dispatch({
      type: CREATE_MERCHANT,
      payload: data
    })
    toastr.success('', 'Merchant has been created successfully', toastrOptions)
    return 'done'
  } catch (error) {
    console.error(error.response)
    toastr.error('error occured. Check the vertical', toastrOptions)
  }
}

export const handleGetMerchants = () => async (dispatch, getState) => {
  toastr.info("Problem here","Get Merchants function has not been resolved. Can't understand verticals", toastrOptions)
  return;
  const state = getState();
  const token = state.auth.user.accessToken;
  const url = 'https://scalable-commerce-backend.herokuapp.com/api/v1/verticals?pageSize=51&pageNumber=1'
  try {
    const response = await axios.get(url, {
      headers: {
        'x-access-token': token
      }
    })
    console.log(response)
    // dispatch({
    //   type: GET_MERCHANTS,
    //   payload: response.data.merchants
    // })
    return 'done'
  } catch(err) {
    console.log(err)
  }
}