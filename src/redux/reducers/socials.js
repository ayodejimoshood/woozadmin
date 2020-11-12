import { ADD_CARTEGORY, ADD_HASHTAG, ADD_HASHTAG_ENTRY, GET_HASHTAGS, GET_SPONSORS, CREATE_SPONSOR, DELETE_SPONSOR } from '../actions/types'

const INITIAL_STATE = {
  cartegory: [],
  hashtag: [],
  hashTagEntry: [],
  sponsors: []
}

export default function socials(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_CARTEGORY:
      return {
        ...state,
        cartegory: [...state.cartegory, ...action.payload]
      };
    case GET_SPONSORS:
      return {
        ...state,
        sponsors: [...action.payload]
      }
    case CREATE_SPONSOR:
      return {
        ...state,
        sponsors: [...state.sponsors, action.payload]
      }
    case DELETE_SPONSOR:
      return {
        ...state,
        sponsors: state.sponsors.filter(sp => {
          console.log(sp._id)
          return sp._id !== action.payload
        })
      }
    case GET_HASHTAGS:
      return {
        ...state,
        hashtag: [...action.payload]
      }
    default:
      return state;
  }
}
