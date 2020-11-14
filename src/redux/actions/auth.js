
import axios from 'axios';
import {returnErrors} from './messages'
import {toastr} from 'react-redux-toastr'

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS

} from './types'

const base = 'https://scalable-commerce-backend.herokuapp.com/api/v1'




const toastrOptions = {
  timeOut: 9000, 
  showCloseButton: true, 
}


//  LOGIN USER
export const login = (payload, history) => async (dispatch) => {


  try {
    const response = await fetch("https://apis.woozeee.com/api/v1/user/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      },
    })

    const data = await response.json()
    if (data.message !== 'user logedin successfully') {
      toastr.error('', 'Incorrect email or password', toastrOptions)
      return;
    }
    toastr.success('', 'Login Success', toastrOptions)
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    })
    history.push("/admin/index")
    return

  } catch (error) {
    toastr.error(error.message, toastrOptions)
    console.log(error)
    return 
  }
}


// LOGOUT


export const logOut = () => {
  toastr.success('', 'Logout Successful', toastrOptions)
  return {
    type: LOGOUT_SUCCESS
  }
}
