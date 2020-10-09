
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
  timeOut: 7000, 
  showCloseButton: true, 
}


//  LOGIN USER
export const login = (payload, history) =>  (dispatch) => {

  console.log(payload, history)
  fetch("https://scalable-commerce-backend.herokuapp.com/api/v1/auth/signin", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    credentials: "same-origin"
  }).then(response => response.json())
  .then(data => {
    if (data.message !== 'User updated successfully') {
      toastr.error('', 'Incorrect email or password', toastrOptions)
      return;
    }
    console.log(data)
    const {email} = payload
    data['email'] = email
    toastr.success('', 'Login Success', toastrOptions)
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    })
    history.push("/admin/index")
  }).catch(function(error) {
    toastr.error(error.message, toastrOptions)
    console.log(error)

  })

}


// LOGOUT


export const logOut = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}
