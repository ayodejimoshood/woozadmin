import { ADD_CARTEGORY, ADD_HASHTAG, ADD_HASHTAG_ENTRY } from '../actions/types'

const INITIAL_STATE = {
  cartegory: [],
  hashtag: [],
  hashTagEntry: []
}

export default function socials(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_CARTEGORY:
      return {
        ...state,
        cartegory: [...state.cartegory, ...action.payload]
      };
    default:
      return state;
  }
}
