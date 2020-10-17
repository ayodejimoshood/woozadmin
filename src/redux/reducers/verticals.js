import {CREATE_VERTICAL, GET_VERTICALS} from '../actions/types'


const INITIAL_STATE = []

export default function vertical(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_VERTICALS:
    case CREATE_VERTICAL:
      return state.concat(action.payload);
    default:
      return state;
  }
} 



