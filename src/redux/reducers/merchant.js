import {CREATE_MERCHANT, GET_MERCHANTS} from '../actions/types'


const INITIAL_STATE = []

export default function merchant(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_MERCHANTS:
    case CREATE_MERCHANT:
      return state.concat(action.payload);
    default:
      return state;
  }
} 



