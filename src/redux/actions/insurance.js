import axios from 'axios'
import { toastr } from 'react-redux-toastr'

const toastrOptions = {
  timeOut: 0, 
  showCloseButton: true, 
}

export const handleCreateInsurance = (data) => async (dispatch, getState) => {
  console.log(data)
  const state = getState();
  const accessToken = state.auth.user.accessToken;
  const config = {
    method: 'post',
    url: 'https://scalable-commerce-backend.herokuapp.com/api/v1/axaMansardInsurances',
    headers: {
      "Content-Type": "application/json",
      "x-access-token": accessToken 
    },
    data: JSON.stringify(data)
  }

  try {
    const response = await axios(config)
    console.log(response)
    console.log(response.data[0].ResponseMessage)
    toastr.warning("", `${response.data[0].ResponseMessage}`, toastrOptions)
    // dispatch({
    //   type: ADD_HASHTAG,
    //   payload: response.data
    // })
  } catch (error) {
    console.log(error.response);
    // if (error.response.data.message === 'Interest does not exists') {
    //   toastr.error(`Interest does not exist`, toastrOptions)
    //   return;
    // }
    toastr.error(`An error occured`, toastrOptions)
    return
  }


}